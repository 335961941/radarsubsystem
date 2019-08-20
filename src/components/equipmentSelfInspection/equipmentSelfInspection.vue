<template>
  <div class="content">
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100">
      <FormItem label="自检类型"
                prop="checkType">
        <Select v-model="formValidate.checkType"
                style="width:350px">
          <Option value="1">常规自检</Option>
          <Option value="2">上电自检</Option>
          <Option value="3">周期自检</Option>
          <Option value="4">维护自检</Option>
        </Select>
      </FormItem>
      <FormItem prop="checkPeriod"
                label="自检周期">
        <Input v-model="formValidate.checkPeriod"
               placeholder="自检周期/s"
               style="width:150px"></Input>
      </FormItem>
      <FormItem label="自检数量"
                prop="checkNum">
        <InputNumber v-model="formValidate.checkNum"
                     :max="255"
                     :min="1"
                     style="width:100px">
        </InputNumber>
      </FormItem>
      <FormItem label="被检单位代码"
                prop="SingleMachineCode">
        <Select v-model="formValidate.SingleMachineCode"
                style="width:350px">
          <Option value="1">雷达侦察子系统</Option>
          <Option value="2">敌我侦查子系统</Option>
          <Option value="3">二次电源子系统</Option>
          <Option value="4">前端运控子系统</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary"
                @click="sendPatten">确定</Button>
        <Button style="margin-left: 8px"
                @click="cancel">取消</Button>
      </FormItem>

    </Form>
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
  </div>

</template>
<script>
import { post } from '@/api/axios.js'
import * as storage from '@/api/localstorage.js'
import { mapGetters } from 'vuex'
// import { sendequipselfinspec } from '@/api/equipmentSelfInspection'
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
      equipmentID: '',
      sendCode: '0',
      sendtime: false,
      pickDate: '',
      pickTime: '',
      insObj: {}, // 列入任务清单
      sendpatten: false,
      formValidate: {
        checkType: '1',
        SingleMachineCode: '1',
        checkPeriod: '',
        checkNum: 1
      },
      ruleValidate: {
        checkType: [
          { required: true, type: 'string', message: '请选择自检类型', trigger: 'change' }
        ],
        checkNum: [
          { required: true, type: 'number', message: '请选择自检数量', trigger: 'blur' }
        ],
        checkPeriod: [
          { required: true, type: 'string', message: '请输入自检周期', trigger: 'blur' }
        ],
        SingleMachineCode: [
          { required: true, type: 'string', message: '请选择被检单位代码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    _getdate (date) {
      if (date.length !== 0) { this.localDate = date }
    },
    cancel () {
      this.modal1 = true
    },
    sure () {
      this.$refs['formValidate'].resetFields()
      this.modal1 = false
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
        this.insObj.name = '设备自检'
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
      let urlN = '/deployment/sendDeviceCheckCMD/communication'
      this.sendRequest(urlN)
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

      return date
    },
    sendRequest (url) {
      var dataTime = this.getTimeNow().split(' ')
      let splitdata = dataTime[0].split('-').join('')
      let splittime = dataTime[1].split(':').join('')
      let datelocal = this.formValidate
      datelocal.taskFlowNo = splitdata + splittime
      datelocal.host = this.hostlist[this.device - 1].host
      let updateAll1
      if (this.updateAll === false) {
        updateAll1 = 0
      } else if (this.updateAll === true) {
        updateAll1 = 1
      }
      datelocal.updateAll = updateAll1
      post(url, datelocal).then((data) => {
        if (data.code === 1) {
          setTimeout(() => {
            // 发送成功将表单数据存到本地
            storage.set(this.equipmentID, { 'date': datelocal })
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
<style scoped>
.content {
  width: 100%;
  padding: 10px 0 0 0;
  position: relative;
}
</style>
