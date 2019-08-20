<template>
  <div class="content">
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100">

      <FormItem label="校时模式"
                prop="timingPattern">
        <Select v-model="formValidate.timingPattern"
                style="width:350px">
          <Option value="1">处理机时间为准</Option>
          <Option value="2">显控台时间为准</Option>
        </Select>
      </FormItem>
      <FormItem prop="timeNow">
        <Input v-model="formValidate.timeNow"
               placeholder="time now"
               style="width: 300px" />
        <Button type="success"
                @click="getTimeNow">获取现在时间</Button>
      </FormItem>
      <FormItem>
        <Button type="primary"
                @click="sendPatten">确定</Button>
        <Button style="margin-left: 8px"
                @click="cancel">取消</Button>
      </FormItem>
      <Modal v-model="modal1"
             @on-ok="sure"
             title="撤消更改">
        <p>确定要撤消刚才做出的更改吗?</p>
      </Modal>
      <Modal v-model="sendpatten"
           title="选择发送模式"
           @on-ok="sendData">
      <Button @click="sendCode='0'">即刻发送</Button>
      <Button style="margin-left: 8px"
              @click="timingSend">定时发送</Button>
    </Modal>
    <Modal v-model="sendtime"
           title="选择定时发送时间">
      <Date-picker type="date"
                   :options="options3"
                   placeholder="选择日期"
                   v-model="pickDate"></Date-picker>
      <Time-picker type="time"
                   size="small"
                   placeholder="选择时间"
                   format="HH点mm分ss秒"
                   v-model="pickTime"></Time-picker>
    </Modal>
    </Form>
  </div>

</template>
<style scoped>
.content {
  width: 100%;
  padding: 10px 0 0 0;
  position: relative;
}
</style>

<script>
import { GMTToStr } from '@/api/transformDate'
import { post } from '@/api/axios.js'
import * as storage from '@/api/localstorage.js'
import { mapGetters } from 'vuex'
export default {
  props: { 'updateAll': Boolean, 'device': Number },
  data () {
    return {
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      modal1: false,
      sendCode: '0',
      sendtime: false,
      pickDate: '',
      pickTime: '',
      insObj: {}, // 列入任务清单
      sendpatten: false,
      equipmentID: '',
      localDate: '',
      loading: true,
      workOrderList: [
        {
          label: '是',
          value: 'YES'
        },
        {
          label: '否',
          value: 'NO'
        }
      ],
      formValidate: {
        timingPattern: '1',
        timeNow: '' // 判断是否全部更新
      },
      watch: {
        'formValidate': {
          handler: function () {
            console.log('DDDDD')
          },
          deep: true
        }
      },
      ruleValidate: {
        timingPattern: [
          { required: true, type: 'string', message: '请选择校时模式', trigger: 'change' }
        ],
        timeNow: [
          { required: true, type: 'string', message: '获取现在时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel (name) {
      this.modal1 = true
      this.$nextTick(() => { this.$refs[name].resetFields() })
    },
    sure () {
      this.cancel('formValidate')
      this.modal1 = false
    },
    getTimeNow () {
      let myDate = new Date()
      let strDate = myDate.toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '').replace(/\//g, '-')
      var time = myDate.getMilliseconds()
      if (time < 10) {
        time = '00' + time
      } else if (time < 100 && time >= 10) {
        time = '0' + time
      } else if (time < 1000 && time >= 100) {
        time = time
      }
      let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') + ':' + time
      this.formValidate.timeNow = date
      return date
    },
    _getdate (date) {
      if (date.length !== 0) { this.localDate = date }
    },
    sendPatten () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.sendpatten = true
        } else {
          this.$Message.error('输入不完整')
        }
      })
    },
    timingSend () { // 定时发送
      this.sendCode = '1'
      this.sendtime = true
    },
    GMTToStr (time) {
      let date = new Date(time)
      let Str = date.getFullYear() + '年' +
        (date.getMonth() + 1) + '月' +
        date.getDate() + '日'
      return Str
    },
    chooseSendTime () {
      this.$Message.success({
        content: '本指令将于' + this.GMTToStr(this.pickDate) + this.pickTime + '发送',
        duration: 3
      })
    },
    sendData () {
      if (this.sendCode === '0') {
        this.submitData()
      } else if (this.sendCode === '1') {
        this.chooseSendTime()
        this.insObj.name = '系统校时'
        this.insObj.time = this.GMTToStr(this.pickDate) + this.pickTime
        if (this.device - 1 === 0) {
          this.$emit('func', this.insObj)
        } else if (this.device - 1 === 1) {
          this.$emit('functi', this.insObj)
        } else if (this.device - 1 === 2) {
          this.$emit('function', this.insObj)
        }
      }
      this.sendpatten = false
    },
    submitData () {
      let urlN = '/deployment/sendSystemTiming/communication'
      this.sendRequest(urlN)
    },
    sendRequest (url) {
      // 转换时间格式
      var dataTime = this.getTimeNow().split(' ')
      let splitdata = dataTime[0].split('-').join('')
      let splittime = dataTime[1].split(':').join('')
      let updateAll1
      if (this.updateAll === false) {
        updateAll1 = 0
      } else if (this.updateAll === true) {
        updateAll1 = 1
      }
      let obj = {}
      obj.timeNow = splitdata + splittime
      obj.time = splitdata + splittime
      obj.host = this.hostlist[this.device - 1].host
      obj.updateAll = updateAll1
      obj.timingPattern = this.formValidate.timingPattern
      console.log(this.hostlist, this.device)
      post(url, obj).then((data) => {
        if (data.code === 1) {
          setTimeout(() => {
            // 发送成功将表单数据存到本地
            storage.set(this.equipmentID, { 'date': obj })
            // 清空表单，避免下次打开有初始值
            this.$refs['formValidate'].resetFields()
            this.$Message.success({
              content: '指令发送成功',
              duration: 1
            })
          }, 500)
        } else {
          this.$Message.error({
            content: '指令提交失败',
            duration: 1
          })
          return this.changeLoading()
        }
      }).catch(() => {
        this.$Message.error({
          content: '网络请求出错',
          duration: 1
        })
        return this.changeLoading()
      })
    },
    setId (id) {
      this.equipmentID = id
    }
  },
  computed: {
    ...mapGetters(['ip', 'hostlist'])
  }
}
</script>
