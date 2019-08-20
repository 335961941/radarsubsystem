<template>
  <div class="content">
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100">
      <FormItem label="指令操作码"
                prop="cmd">
        <Select v-model="formValidate.cmd"
                style="width:350px">
          <Option value="0">查询版本信息</Option>
          <Option value="1">更新软件版本</Option>
        </Select>
      </FormItem>
      <FormItem prop="softwareID"
                label="软件ID号">
        <Input v-model="formValidate.softwareID"
               placeholder="软件ID号"
               style="width:150px"></Input>
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
<script>
import { nowTime } from '@/api/getNowtime'
import { post } from '@/api/axios.js'
import * as storage from '@/api/localstorage.js'
import { mapGetters } from 'vuex'
export default {
  props: { 'updateAll': Boolean, 'device': Number },
  computed: {
    ...mapGetters(['ip', 'hostlist'])
  },
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
      formValidate: {
        cmd: '0',
        softwareID: ''
      },
      ruleValidate: {
        cmd: [
          { required: true, message: '请选择指令操作码', trigger: 'change' }
        ],
        softwareID: [
          { required: true, message: '请输入软件ID号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    _getdate (date) {
      if (date.length !== 0) { this.localDate = date }
    },
    cancel (name) {
      this.modal1 = true
      this.$nextTick(() => { this.$refs[name].resetFields() })
    },
    sure () {
      this.cancel('formValidate')
      this.modal1 = false
    },
    submitData () {
      let urlN = '/deployment/sendSoftwareUpdateCMD/communication'
      this.sendRequest(urlN)
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
        this.insObj.name = '软件版本远程更新'
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
    sendRequest (url) {
      let updateAll1
      if (this.updateAll === false) {
        updateAll1 = 0
      } else if (this.updateAll === true) {
        updateAll1 = 1
      }
      let obj = { timeNow: nowTime(), updateAll: updateAll1, cmd: this.formValidate.cmd, softwareID: this.formValidate.softwareID, host: this.hostlist[this.device - 1].host }
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
        }
      }).catch(() => {
        this.$Message.error({
          content: '网络请求出错',
          duration: 1
        })
      })
    }
  }
}
</script>
<style scoped>
.content {
  width: 100%;
  padding: 10px 0 0 0;
  position: relative;
}
</style>
