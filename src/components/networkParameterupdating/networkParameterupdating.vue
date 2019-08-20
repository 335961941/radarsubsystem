<template>
  <div class="content">
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="105">
      <FormItem label="指令操作码"
                prop="cmd">
        <Select v-model="formValidate.cmd"
                style="width:150px">
          <Option value="1">查询信息</Option>
          <Option value="2">更新参数</Option>
        </Select>
      </FormItem>
      <div class="inp">
        <FormItem prop="networkIP1"
                  label="网络IP地址1">
          <Input v-model="formValidate.ipone1"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipone2"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipone3"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipone4"
                 style="width:36px"
                 :maxlength=3></Input>
        </FormItem>
        <FormItem prop="networkMacIP1"
                  label="网络MAC地址1"
                  style="width:320px">
          <Input v-model="formValidate.macone1"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macone2"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macone3"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macone4"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macone5"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macone6"
                 style="width:32px"
                 :maxlength=2></Input>
        </FormItem>
        <FormItem prop="networkMessage1"
                  label="网络端口信息1">
          <Input v-model="formValidate.networkMessage1"
                 style="width:150px"></Input>
        </FormItem>
        <FormItem prop="networkIP2"
                  label="网络IP地址2">
          <Input v-model="formValidate.ipsecond1"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipsecond2"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipsecond3"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipsecond4"
                 style="width:36px"
                 :maxlength=3></Input>
        </FormItem>
        <FormItem prop="networkMacIP2"
                  label="网络MAC地址2"
                  style="width:320px">
          <Input v-model="formValidate.macsecond1"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsecond2"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsecond3"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsecond4"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsecond5"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsecond6"
                 style="width:32px"
                 :maxlength=2></Input>
        </FormItem>
        <FormItem prop="networkMessage2"
                  label="网络端口信息2">
          <Input v-model="formValidate.networkMessage2"
                 style="width:150px"></Input>
        </FormItem>
        <FormItem prop="networkIP3"
                  label="网络IP地址3">
          <Input v-model="formValidate.ipthird1"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipthird2"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipthird3"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipthird4"
                 style="width:36px"
                 :maxlength=3></Input>
        </FormItem>
        <FormItem prop="networkMacIP3"
                  label="网络MAC地址3"
                  style="width:320px">
          <Input v-model="formValidate.macthird1"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macthird2"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macthird3"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macthird4"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macthird5"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macthird6"
                 style="width:32px"
                 :maxlength=2></Input>
        </FormItem>
        <FormItem prop="networkMessage3"
                  label="网络端口信息3">
          <Input v-model="formValidate.networkMessage3"
                 style="width:150px"></Input>
        </FormItem>
        <FormItem prop="networkIP4"
                  label="网络IP地址4">
          <Input v-model="formValidate.ipforth1"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipforth2"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipforth3"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipforth4"
                 style="width:36px"
                 :maxlength=3></Input>
        </FormItem>
        <FormItem prop="networkMacIP4"
                  label="网络MAC地址4"
                  style="width:320px">
          <Input v-model="formValidate.macforth1"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macforth2"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macforth3"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macforth4"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macforth5"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macforth6"
                 style="width:32px"
                 :maxlength=2></Input>
        </FormItem>
        <FormItem prop="networkMessage4"
                  label="网络端口信息4">
          <Input v-model="formValidate.networkMessage4"
                 style="width:150px"></Input>
        </FormItem>
        <FormItem prop="networkIP5"
                  label="网络IP地址5">
          <Input v-model="formValidate.ipfifth1"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipfifth2"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipfifth3"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipfifth4"
                 style="width:36px"
                 :maxlength=3></Input>
        </FormItem>
        <FormItem prop="networkMacIP5"
                  label="网络MAC地址5"
                  style="width:320px">
          <Input v-model="formValidate.macfifth1"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macfifth2"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macfifth3"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macfifth4"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macfifth5"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macfifth6"
                 style="width:32px"
                 :maxlength=2></Input>
        </FormItem>
        <FormItem prop="networkMessage5"
                  label="网络端口信息5">
          <Input v-model="formValidate.networkMessage5"
                 style="width:150px"></Input>
        </FormItem>
        <FormItem prop="networkIP6"
                  label="网络IP地址6">
          <Input v-model="formValidate.ipsixth1"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipsixth2"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipsixth3"
                 style="width:36px"
                 :maxlength=3></Input><label class="lab"> .</label>
          <Input v-model="formValidate.ipsixth4"
                 style="width:36px"
                 :maxlength=3></Input>
        </FormItem>
        <FormItem prop="networkMacIP6"
                  label="网络MAC地址6"
                  style="width:320px">
          <Input v-model="formValidate.macsixth1"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsixth2"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsixth3"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsixth4"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsixth5"
                 style="width:32px"
                 :maxlength=2></Input>
          <Input v-model="formValidate.macsixth6"
                 style="width:32px"
                 :maxlength=2></Input>
        </FormItem>
        <FormItem prop="networkMessage6"
                  label="网络端口信息6">
          <Input v-model="formValidate.networkMessage6"
                 style="width:150px"></Input>
        </FormItem>
      </div>
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
      formValidate: {
        isOnly: 'NO',
        cmd: '1',
        ipone1: '192',
        ipone2: '168',
        ipone3: '31',
        ipone4: '88',
        ipsecond1: '192',
        ipsecond2: '168',
        ipsecond3: '31',
        ipsecond4: '88',
        ipthird1: '192',
        ipthird2: '168',
        ipthird3: '31',
        ipthird4: '88',
        ipforth1: '192',
        ipforth2: '168',
        ipforth3: '31',
        ipforth4: '88',
        ipfifth1: '192',
        ipfifth2: '168',
        ipfifth3: '31',
        ipfifth4: '88',
        ipsixth1: '192',
        ipsixth2: '168',
        ipsixth3: '31',
        ipsixth4: '88',
        macone1: 'E8',
        macone2: '03',
        macone3: '9A',
        macone4: '35',
        macone5: '2B',
        macone6: 'ED',
        macsecond1: 'E8',
        macsecond2: '03',
        macsecond3: '9A',
        macsecond4: '35',
        macsecond5: '2B',
        macsecond6: 'ED',
        macthird1: 'E8',
        macthird2: '03',
        macthird3: '9A',
        macthird4: '35',
        macthird5: '2B',
        macthird6: 'ED',
        macforth1: 'E8',
        macforth2: '03',
        macforth3: '9A',
        macforth4: '35',
        macforth5: '2B',
        macforth6: 'ED',
        macfifth1: 'E8',
        macfifth2: '03',
        macfifth3: '9A',
        macfifth4: '35',
        macfifth5: '2B',
        macfifth6: 'ED',
        macsixth1: 'E8',
        macsixth2: '03',
        macsixth3: '9A',
        macsixth4: '35',
        macsixth5: '2B',
        macsixth6: 'ED',
        networkMessage1: '8080',
        networkMessage2: '8080',
        networkMessage3: '8080',
        networkMessage4: '8080',
        networkMessage5: '8080',
        networkMessage6: '8080',
        networkID: '1'
      },
      ruleValidate: {
        cmd: [
          { required: true, message: '请选择指令操作码', trigger: 'change' }
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
      this.handleReset('formValidate')
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
        this.insObj.name = '设备网络参数更新'
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
      let urlN = '/deployment/sendDeviceNetworkCMD/communication'
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
      for (let item in this.formValidate) {
        if (this.formValidate[item] == '') {
          this.$Message.error({
            content: '设备参数' + item + '未填写',
            duration: 3
          })
        }
      }
      let datelocal = {}
      datelocal.cmd = this.formValidate.cmd
      datelocal.taskFlowNo = splitdata + splittime
      datelocal.host = this.hostlist[this.device - 1].host
      datelocal.networkID = this.device
      datelocal.networkIP1 = this.formValidate.ipone1 + this.formValidate.ipone2 + this.formValidate.ipone3 + this.formValidate.ipone4
      datelocal.networkIP2 = this.formValidate.ipsecond1 + this.formValidate.ipsecond2 + this.formValidate.ipsecond3 + this.formValidate.ipsecond4
      datelocal.networkIP3 = this.formValidate.ipthird1 + this.formValidate.ipthird2 + this.formValidate.ipthird3 + this.formValidate.ipthird4
      datelocal.networkIP4 = this.formValidate.ipforth1 + this.formValidate.ipforth2 + this.formValidate.ipforth3 + this.formValidate.ipforth4
      datelocal.networkIP5 = this.formValidate.ipfifth1 + this.formValidate.ipfifth2 + this.formValidate.ipfifth3 + this.formValidate.ipfifth4
      datelocal.networkIP6 = this.formValidate.ipsixth1 + this.formValidate.ipsixth2 + this.formValidate.ipsixth3 + this.formValidate.ipsixth4
      datelocal.networkMacIP1 = this.formValidate.macone1 + this.formValidate.macone2 + this.formValidate.macone3 + this.formValidate.macone4 + this.formValidate.macone5 + this.formValidate.macone6
      datelocal.networkMacIP2 = this.formValidate.macsecond1 + this.formValidate.macsecond2 + this.formValidate.macsecond3 + this.formValidate.macsecond4 + this.formValidate.macsecond5 + this.formValidate.macsecond6
      datelocal.networkMacIP3 = this.formValidate.macthird1 + this.formValidate.macthird2 + this.formValidate.macthird3 + this.formValidate.macthird4 + this.formValidate.macthird5 + this.formValidate.macthird6
      datelocal.networkMacIP4 = this.formValidate.macforth1 + this.formValidate.macforth2 + this.formValidate.macforth3 + this.formValidate.macforth4 + this.formValidate.macforth5 + this.formValidate.macforth6
      datelocal.networkMacIP5 = this.formValidate.macfifth1 + this.formValidate.macfifth2 + this.formValidate.macfifth3 + this.formValidate.macfifth4 + this.formValidate.macfifth5 + this.formValidate.macfifth6
      datelocal.networkMacIP6 = this.formValidate.macsixth1 + this.formValidate.macsixth2 + this.formValidate.macsixth3 + this.formValidate.macsixth4 + this.formValidate.macsixth5 + this.formValidate.macsixth6
      datelocal.networkMessage1 = this.formValidate.networkMessage1
      datelocal.networkMessage2 = this.formValidate.networkMessage2
      datelocal.networkMessage3 = this.formValidate.networkMessage3
      datelocal.networkMessage4 = this.formValidate.networkMessage4
      datelocal.networkMessage5 = this.formValidate.networkMessage5
      datelocal.networkMessage6 = this.formValidate.networkMessage6
      let updateAll1
      if (this.updateAll === false) {
        updateAll1 = 0
      } else if (this.updateAll === true) {
        updateAll1 = 1
      }
      datelocal.updateAll = updateAll1
      console.log(datelocal)
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
/* .inp{
  display: flex;
  justify-content: space-between;
  width: 100%;
} */
.inp div {
  width: 300px;
  display: inline-block;
}
.lab {
  position: relative;
  top: 7px;
  font-size: 20px;
}
.ivu-input {
  padding: 0;
}
</style>
