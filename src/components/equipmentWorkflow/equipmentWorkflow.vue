<template>
  <div class="content">
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="132">

      <Card style="display:block;width:100%;margin-bottom:15px;">
        <FormItem label="雷达分机指令发送次数"
                  style="margin-right:15px">
          <Card>
            <div v-for="item in radarExtensionNum">
              <div style="border:1px solid rgb(232,234,236);border-radius:4px;display:inline-block;margin-right:15px;width:35%;text-align:center"> 雷达分机指令
              </div><Button type="primary"
                      @click="modify">修改</Button>
            </div>
          </Card>
          <Button type="success"
                  @click="addExtension">添加</Button>
          <Button type="primary"
                  @click="sendExtension">确定</Button>
        </FormItem>
        <FormItem label="雷达系统指令发送次数">
          <Card>
            <div v-for="item in radarSystemNum">
              <div style="border:1px solid rgb(232,234,236);border-radius:4px;display:inline-block;margin-right:15px;width:35%;text-align:center"> 雷达系统指令 </div>
              <Button type="primary"
                      @click="modify1">修改</Button>
            </div>
          </Card>
          <Button type="success"
                  @click="addSystem">添加</Button>
          <Button type="primary"
                  @click="sendSystem">确定</Button>
        </FormItem>
      </Card>
      <Modal title="修改雷达分机指令"
             v-model="dialogVisible"
             @on-ok="saveDialogExtension"
             class="model">
        <FormItem label="内外秒脉冲选择"
                  prop="pulse">
          <Select v-model="dialogExtension.pulse"
                  style="width:120px">
            <Option value="0">内部</Option>
            <Option value="1">外部</Option>
          </Select>
        </FormItem>
        <Card style="display:block;width:100%;margin-bottom:15px; font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">分机控制字</p>
          <FormItem label="看门狗开启"
                    prop="watchdogOpen">
            <Select v-model="dialogExtension.watchdogOpen"
                    style="width:120px">
              <Option value="0">看门狗开</Option>
              <Option value="1">看门狗关</Option>
            </Select>
          </FormItem>
          <FormItem label="工作状态"
                    prop="state">
            <Select v-model="dialogExtension.state"
                    placeholder="是否发送状态"
                    style="width:120px">
              <Option value="0">不发送工作状态</Option>
              <Option value="1">发送工作状态</Option>
            </Select>
          </FormItem>
          <FormItem label="合批开关"
                    prop="open">
            <Select v-model="dialogExtension.open"
                    placeholder="打开/关闭"
                    style="width:120px">
              <Option value="0">合批开</Option>
              <Option value="1">合批关</Option>
            </Select>
          </FormItem>
          <FormItem label="传输脉冲"
                    prop="transformModal">
            <Select v-model="dialogExtension.transformModal"
                    placeholder="选择类型"
                    style="width:120px">
              <Option value="0">传输原始全脉冲</Option>
              <Option value="1">传输校正后全脉冲</Option>
              <Option value="2">相位差校正值</Option>
              <Option value="3">校正后相位差</Option>
            </Select>
          </FormItem>
          <FormItem label="分选预处理模式"
                    prop="dealmodal">
            <Select v-model="dialogExtension.dealmodal"
                    placeholder="选择类型"
                    style="width:120px">
              <Option value="0">频率预处理</Option>
              <Option value="1">频率+角度预处理</Option>
            </Select>
          </FormItem>
          <FormItem label="校准模式选择"
                    prop="calibrationModal">
            <Select v-model="dialogExtension.calibrationModal"
                    placeholder="选择模式"
                    style="width:120px">
              <Option value="0">实时校准</Option>
              <Option value="1">固定校准</Option>
            </Select>
          </FormItem>
          <FormItem label="校正表"
                    prop="selectcalibration">
            <Select v-model="dialogExtension.selectcalibration"
                    placeholder="需要的操作"
                    style="width:120px">
              <Option value="0">等待</Option>
              <Option value="1">清零校正表接收缓存</Option>
              <Option value="2">上传固定校正表</Option>
              <Option value="3">上传残差校正表</Option>
            </Select>
          </FormItem>
        </Card>
        <FormItem label="检测门限调节"
                  prop="threshold">
          <InputNumber v-model="dialogExtension.threshold"
                       placeholder="单位1dB"
                       :min="1"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="需要上传的全脉冲数"
                  prop="overallpulse">
          <InputNumber v-model="dialogExtension.overallpulse"
                       placeholder="单位100个"
                       :min="1"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最小幅度"
                  prop="minamplitude">
          <InputNumber v-model="dialogExtension.minamplitude"
                       placeholder="单位0.5dB"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最大幅度"
                  prop="maxamplitude">
          <InputNumber v-model="dialogExtension.maxamplitude"
                       placeholder="单位0.5dB"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最小脉宽"
                  prop="minPulsewidth">
          <InputNumber v-model="dialogExtension.minPulsewidth"
                       placeholder="单位100ns"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最大脉宽"
                  prop="maxPulsewidth">
          <InputNumber v-model="dialogExtension.maxPulsewidth"
                       placeholder="单位100ns"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="筛选最大频率"
                  prop="filterMaximumFrequency">
          <InputNumber v-model="dialogExtension.filterMaximumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="筛选最小频率"
                  prop="filterMinimumFrequency">
          <InputNumber v-model="dialogExtension.filterMinimumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="屏蔽最大频率"
                  prop="shieldingMaximumFrequency">
          <InputNumber v-model="dialogExtension.shieldingMaximumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="屏蔽最小频率"
                  prop="shieldingMinimumFrequency">
          <InputNumber v-model="dialogExtension.shieldingMinimumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="默认值更新标记"
                  prop="defalutUpdate">
          <Select v-model="dialogExtension.defalutUpdate"
                  placeholder="是否更新"
                  style="width:120px">
            <Option value="0">不更新</Option>
            <Option value="1">更新</Option>
          </Select>
        </FormItem>
      </Modal>
      <Modal title="修改雷达系统指令"
             v-model="dialogVisible1"
             @on-ok="saveDialogSystem"
             class="model">
        <FormItem label="工作模式"
                  prop="workPattern">
          <Select v-model="dialogSystem.workPattern"
                  placeholder="选择模式"
                  style="width:120px">
            <Option value="0">自检</Option>
            <Option value="1">频域搜索</Option>
            <Option value="2">驻留</Option>
            <Option value="3">空域搜索</Option>
          </Select>
        </FormItem>
        <FormItem label="工作周期"
                  prop="workPeriod">
          <Input v-model="dialogSystem.workPeriod"
                 placeholder="单位:50ms"
                 :min="0"
                 style="width:120px">
          </Input>
        </FormItem>
        <FormItem label="工作周期数"
                  prop="workPeriodNum">
          <InputNumber v-model="dialogSystem.workPeriodNum"
                       placeholder="工作次数"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="起始频率"
                  prop="initialFrequency">
          <InputNumber v-model="dialogSystem.initialFrequency"
                       placeholder="分辨率:1MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="终止频率"
                  prop="terminationFrequency">
          <InputNumber v-model="dialogSystem.terminationFrequency"
                       placeholder="分辨率:1MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="频率步进"
                  prop="steppedFrequency">
          <InputNumber v-model="dialogSystem.steppedFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="带宽选择"
                  prop="bandWidthSelection">
          <Select v-model="dialogSystem.bandWidthSelection"
                  placeholder="选择带宽"
                  style="width:120px">
            <Option value="0">400M</Option>
            <Option value="1">200M</Option>
            <Option value="2">40M</Option>
            <Option value="3">10M</Option>
            <Option value="4">5MHz</Option>
          </Select>
        </FormItem>
        <FormItem label="天线1选择"
                  prop="antennaSelection1">
          <Select v-model="dialogSystem.antennaSelection1"
                  placeholder="选择天线1"
                  style="width:120px">
            <Option value="0">前</Option>
            <Option value="1">后</Option>
            <Option value="2">左</Option>
            <Option value="3">右</Option>
          </Select>
        </FormItem>
        <FormItem label="天线2选择"
                  prop="antennaSelection2">
          <Select v-model="dialogSystem.antennaSelection2"
                  placeholder="选择天线2"
                  style="width:120px">
            <Option value="0">前</Option>
            <Option value="1">后</Option>
            <Option value="2">左</Option>
            <Option value="3">右</Option>
          </Select>
        </FormItem>
        <Card style="display:block;width:100%;margin-bottom:15px;font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频1衰减</p>
          <FormItem label="6-18GHz射频衰减1"
                    prop="attenuation1618">
            <Select v-model="dialogSystem.attenuation1618"
                    placeholder="选择6-18GHz射频衰减1"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1前级"
                    prop="attenuationEarlyStage126">
            <Select v-model="dialogSystem.attenuationEarlyStage126"
                    placeholder="选择2-6GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1后级"
                    prop="attenuationLateStage126">
            <Select v-model="dialogSystem.attenuationLateStage126"
                    placeholder="选择2-6GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1前级"
                    prop="attenuationEarlyStage1082">
            <Select v-model="dialogSystem.attenuationEarlyStage1082"
                    placeholder="选择0.8-2GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1后级"
                    prop="attenuationLateStage1082">
            <Select v-model="dialogSystem.attenuationLateStage1082"
                    placeholder="选择0.8-2GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1前级"
                    prop="attenuationEarlyStage103808">
            <Select v-model="dialogSystem.attenuationEarlyStage103808"
                    placeholder="选择0.38-0.8GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1后级"
                    prop="attenuationLateStage103808">
            <Select v-model="dialogSystem.attenuationLateStage103808"
                    placeholder="选择0.38-0.8GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频1长电缆均衡衰减控制</p>
          <FormItem label="控制0.5dB"
                    prop="db05">
            <Select v-model="dialogSystem.db05"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db1">
            <Select v-model="dialogSystem.db1"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db2">
            <Select v-model="dialogSystem.db2"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db4">
            <Select v-model="dialogSystem.db4"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db8">
            <Select v-model="dialogSystem.db8"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db16">
            <Select v-model="dialogSystem.db16"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频2衰减</p>
          <FormItem label="6-18GHz射频衰减1"
                    prop="attenuation2618">
            <Select v-model="dialogSystem.attenuation2618"
                    placeholder="选择6-18GHz射频衰减1"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1前级"
                    prop="attenuationEarlyStage226">
            <Select v-model="dialogSystem.attenuationEarlyStage226"
                    placeholder="选择2-6GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1后级"
                    prop="attenuationLateStage226">
            <Select v-model="dialogSystem.attenuationLateStage226"
                    placeholder="选择2-6GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1前级"
                    prop="attenuationEarlyStage2082">
            <Select v-model="dialogSystem.attenuationEarlyStage2082"
                    placeholder="选择0.8-2GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1后级"
                    prop="attenuationLateStage2082">
            <Select v-model="dialogSystem.attenuationLateStage2082"
                    placeholder="选择0.8-2GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1前级"
                    prop="attenuationEarlyStage203808">
            <Select v-model="dialogSystem.attenuationEarlyStage203808"
                    placeholder="选择0.38-0.8GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1后级"
                    prop="attenuationLateStage203808">
            <Select v-model="dialogSystem.attenuationLateStage203808"
                    placeholder="选择0.38-0.8GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频2长电缆均衡衰减控制</p>
          <FormItem label="控制0.5dB"
                    prop="db205">
            <Select v-model="dialogSystem.db205"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db21">
            <Select v-model="dialogSystem.db21"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db22">
            <Select v-model="dialogSystem.db22"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db24">
            <Select v-model="dialogSystem.db24"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db28">
            <Select v-model="dialogSystem.db28"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db216">
            <Select v-model="dialogSystem.db216"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">中频1衰减</p>
          <FormItem label="控制0.5dB"
                    prop="db305">
            <Select v-model="dialogSystem.db305"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db31">
            <Select v-model="dialogSystem.db31"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db32">
            <Select v-model="dialogSystem.db32"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db34">
            <Select v-model="dialogSystem.db34"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db38">
            <Select v-model="dialogSystem.db38"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db316">
            <Select v-model="dialogSystem.db316"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;font-size:12px">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">中频2衰减</p>
          <FormItem label="控制0.5dB"
                    prop="db405">
            <Select v-model="dialogSystem.db405"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db41">
            <Select v-model="dialogSystem.db41"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db42">
            <Select v-model="dialogSystem.db42"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db44">
            <Select v-model="dialogSystem.db44"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db48">
            <Select v-model="dialogSystem.db48"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db416">
            <Select v-model="dialogSystem.db416"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <FormItem label="衰减码控制方式"
                  prop="attenuationCodeControlMode">
          <Select v-model="dialogSystem.attenuationCodeControlMode"
                  placeholder="选择衰减码控制方式"
                  style="width:120px">
            <Option value="0">从衰减表读</Option>
            <Option value="1">上机位控制</Option>
          </Select>
        </FormItem>
        <FormItem label="自检源衰减"
                  prop="selfCheckingSourceAttenuation">
          <Input v-model="dialogSystem.selfCheckingSourceAttenuation"
                 placeholder="自检源衰减"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="脉内引导批次号开关"
                  prop="batchNumberSwitch">
          <Select v-model="dialogSystem.batchNumberSwitch"
                  placeholder="选择脉内引导批次号开关"
                  style="width:120px">
            <Option value="0">关闭</Option>
            <Option value="1">打开</Option>
          </Select>
        </FormItem>
        <FormItem label="脉内引导批次号"
                  prop="batchNumber">
          <Input v-model="dialogSystem.batchNumber"
                 placeholder="脉内引导批次号"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="故障检测门限"
                  prop="faultDetectionThreshold">
          <Input v-model="dialogSystem.faultDetectionThreshold"
                 placeholder="故障检测门限"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="单次执行指令集所需时间"
                  prop="timeRequired">
          <Input v-model="dialogSystem.timeRequired"
                 placeholder="单次执行指令集所需时间"
                 style="width:120px"></Input>
        </FormItem>
      </Modal>
      <FormItem label="指令有效标记"
                prop="cmd"
                style="display:inline-block">
        <Select v-model="formValidate.cmd"
                style="width:350px">
          <Option value="1">所有子系统</Option>
          <Option value="2">雷达侦察子系统</Option>
          <Option value="3">敌我侦察子系统</Option>
        </Select>
      </FormItem>
      <p style="font-size: 14px;font-weight: 800;margin-left: 10px;">雷达分机指令</p>
      <div class="inp">
        <FormItem label="内外秒脉冲选择"
                  prop="pulse">
          <Select v-model="formValidate.pulse"
                  style="width:120px">
            <Option value="0">内部</Option>
            <Option value="1">外部</Option>
          </Select>
        </FormItem>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">分机控制字</p>
          <FormItem label="看门狗开启"
                    prop="watchdogOpen">
            <Select v-model="formValidate.watchdogOpen"
                    style="width:120px">
              <Option value="0">看门狗开</Option>
              <Option value="1">看门狗关</Option>
            </Select>
          </FormItem>
          <FormItem label="工作状态"
                    prop="state">
            <Select v-model="formValidate.state"
                    placeholder="是否发送状态"
                    style="width:120px">
              <Option value="0">不发送工作状态</Option>
              <Option value="1">发送工作状态</Option>
            </Select>
          </FormItem>
          <FormItem label="合批开关"
                    prop="open">
            <Select v-model="formValidate.open"
                    placeholder="打开/关闭"
                    style="width:120px">
              <Option value="0">合批开</Option>
              <Option value="1">合批关</Option>
            </Select>
          </FormItem>
          <FormItem label="传输脉冲"
                    prop="transformModal">
            <Select v-model="formValidate.transformModal"
                    placeholder="选择类型"
                    style="width:120px">
              <Option value="0">传输原始全脉冲</Option>
              <Option value="1">传输校正后全脉冲</Option>
              <Option value="2">相位差校正值</Option>
              <Option value="3">校正后相位差</Option>
            </Select>
          </FormItem>
          <FormItem label="分选预处理模式"
                    prop="dealmodal">
            <Select v-model="formValidate.dealmodal"
                    placeholder="选择类型"
                    style="width:120px">
              <Option value="0">频率预处理</Option>
              <Option value="1">频率+角度预处理</Option>
            </Select>
          </FormItem>
          <FormItem label="校准模式选择"
                    prop="calibrationModal">
            <Select v-model="formValidate.calibrationModal"
                    placeholder="选择模式"
                    style="width:120px">
              <Option value="0">实时校准</Option>
              <Option value="1">固定校准</Option>
            </Select>
          </FormItem>
          <FormItem label="校正表"
                    prop="selectcalibration">
            <Select v-model="formValidate.selectcalibration"
                    placeholder="需要的操作"
                    style="width:120px">
              <Option value="0">等待</Option>
              <Option value="1">清零校正表接收缓存</Option>
              <Option value="2">上传固定校正表</Option>
              <Option value="3">上传残差校正表</Option>
            </Select>
          </FormItem>
        </Card>
        <FormItem label="检测门限调节"
                  prop="threshold">
          <InputNumber v-model="formValidate.threshold"
                       placeholder="单位1dB"
                       :min="1"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="需要上传的全脉冲数"
                  prop="overallpulse">
          <InputNumber v-model="formValidate.overallpulse"
                       placeholder="单位100个"
                       :min="1"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最小幅度"
                  prop="minamplitude">
          <InputNumber v-model="formValidate.minamplitude"
                       placeholder="单位0.5dB"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最大幅度"
                  prop="maxamplitude">
          <InputNumber v-model="formValidate.maxamplitude"
                       placeholder="单位0.5dB"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最小脉宽"
                  prop="minPulsewidth">
          <InputNumber v-model="formValidate.minPulsewidth"
                       placeholder="单位100ns"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="最大脉宽"
                  prop="maxPulsewidth">
          <InputNumber v-model="formValidate.maxPulsewidth"
                       placeholder="单位100ns"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="筛选最大频率"
                  prop="filterMaximumFrequency">
          <InputNumber v-model="formValidate.filterMaximumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="筛选最小频率"
                  prop="filterMinimumFrequency">
          <InputNumber v-model="formValidate.filterMinimumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="屏蔽最大频率"
                  prop="shieldingMaximumFrequency">
          <InputNumber v-model="formValidate.shieldingMaximumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="屏蔽最小频率"
                  prop="shieldingMinimumFrequency">
          <InputNumber v-model="formValidate.shieldingMinimumFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="默认值更新标记"
                  prop="defalutUpdate">
          <Select v-model="formValidate.defalutUpdate"
                  placeholder="是否更新"
                  style="width:120px">
            <Option value="0">不更新</Option>
            <Option value="1">更新</Option>
          </Select>
        </FormItem>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">带宽选择</p>
          <FormItem label="1030"
                    prop="bandWidth1">
            <Select v-model="formValidate.bandWidth1"
                    style="width:120px">
              <Option value="0">4M</Option>
              <Option value="1">8M</Option>
              <Option value="2">16M</Option>
              <Option value="3">24M</Option>
            </Select>
          </FormItem>
          <FormItem label="1090"
                    prop="bandWidth2">
            <Select v-model="formValidate.bandWidth2"
                    style="width:120px">
              <Option value="0">4M</Option>
              <Option value="1">8M</Option>
              <Option value="2">16M</Option>
              <Option value="3">24M</Option>
            </Select>
          </FormItem>
          <FormItem label="740"
                    prop="bandWidth3">
            <Select v-model="formValidate.bandWidth3"
                    style="width:120px">
              <Option value="0">4M</Option>
              <Option value="1">8M</Option>
            </Select>
          </FormItem>
          <FormItem label="837.5"
                    prop="bandWidth4">
            <Select v-model="formValidate.bandWidth4"
                    style="width:120px">
              <Option value="0">4M</Option>
              <Option value="1">8M</Option>
            </Select>
          </FormItem>
          <FormItem label="1532"
                    prop="bandWidth5">
            <Select v-model="formValidate.bandWidth5"
                    style="width:120px">
              <Option value="1">8M</Option>
              <Option value="3">24M</Option>
            </Select>
          </FormItem>
          <FormItem label="1464M"
                    prop="bandWidth6">
            <Select v-model="formValidate.bandWidth6"
                    style="width:120px">
              <Option value="1">8M</Option>
              <Option value="3">24M</Option>
            </Select>
          </FormItem>
        </Card>
        <p style="font-size: 14px;font-weight: 800;margin-left: 10px;">雷达系统指令</p>
        <FormItem label="工作模式"
                  prop="workPattern">
          <Select v-model="formValidate.workPattern"
                  placeholder="选择模式"
                  style="width:120px">
            <Option value="0">自检</Option>
            <Option value="1">频域搜索</Option>
            <Option value="2">驻留</Option>
            <Option value="3">空域搜索</Option>
          </Select>
        </FormItem>
        <FormItem label="工作周期"
                  prop="workPeriod">
          <Input v-model="formValidate.workPeriod"
                 placeholder="单位:50ms"
                 :min="0"
                 style="width:120px">
          </Input>
        </FormItem>
        <FormItem label="工作周期数"
                  prop="workPeriodNum">
          <InputNumber v-model="formValidate.workPeriodNum"
                       placeholder="工作次数"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="起始频率"
                  prop="initialFrequency">
          <InputNumber v-model="formValidate.initialFrequency"
                       placeholder="分辨率:1MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="终止频率"
                  prop="terminationFrequency">
          <InputNumber v-model="formValidate.terminationFrequency"
                       placeholder="分辨率:1MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="频率步进"
                  prop="steppedFrequency">
          <InputNumber v-model="formValidate.steppedFrequency"
                       placeholder="单位:MHz"
                       :min="0"
                       style="width:120px">
          </InputNumber>
        </FormItem>
        <FormItem label="带宽选择"
                  prop="bandWidthSelection">
          <Select v-model="formValidate.bandWidthSelection"
                  placeholder="选择带宽"
                  style="width:120px">
            <Option value="0">400M</Option>
            <Option value="1">200M</Option>
            <Option value="2">40M</Option>
            <Option value="3">10M</Option>
            <Option value="4">5MHz</Option>
          </Select>
        </FormItem>
        <FormItem label="天线1选择"
                  prop="antennaSelection1">
          <Select v-model="formValidate.antennaSelection1"
                  placeholder="选择天线1"
                  style="width:120px">
            <Option value="0">前</Option>
            <Option value="1">后</Option>
            <Option value="2">左</Option>
            <Option value="3">右</Option>
          </Select>
        </FormItem>
        <FormItem label="天线2选择"
                  prop="antennaSelection2">
          <Select v-model="formValidate.antennaSelection2"
                  placeholder="选择天线2"
                  style="width:120px">
            <Option value="0">前</Option>
            <Option value="1">后</Option>
            <Option value="2">左</Option>
            <Option value="3">右</Option>
          </Select>
        </FormItem>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频1衰减</p>
          <FormItem label="6-18GHz射频衰减1"
                    prop="attenuation1618">
            <Select v-model="formValidate.attenuation1618"
                    placeholder="选择6-18GHz射频衰减1"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1前级"
                    prop="attenuationEarlyStage126">
            <Select v-model="formValidate.attenuationEarlyStage126"
                    placeholder="选择2-6GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1后级"
                    prop="attenuationLateStage126">
            <Select v-model="formValidate.attenuationLateStage126"
                    placeholder="选择2-6GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1前级"
                    prop="attenuationEarlyStage1082">
            <Select v-model="formValidate.attenuationEarlyStage1082"
                    placeholder="选择0.8-2GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1后级"
                    prop="attenuationLateStage1082">
            <Select v-model="formValidate.attenuationLateStage1082"
                    placeholder="选择0.8-2GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1前级"
                    prop="attenuationEarlyStage103808">
            <Select v-model="formValidate.attenuationEarlyStage103808"
                    placeholder="选择0.38-0.8GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1后级"
                    prop="attenuationLateStage103808">
            <Select v-model="formValidate.attenuationLateStage103808"
                    placeholder="选择0.38-0.8GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频1长电缆均衡衰减控制</p>
          <FormItem label="控制0.5dB"
                    prop="db05">
            <Select v-model="formValidate.db05"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db1">
            <Select v-model="formValidate.db1"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db2">
            <Select v-model="formValidate.db2"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db4">
            <Select v-model="formValidate.db4"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db8">
            <Select v-model="formValidate.db8"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db16">
            <Select v-model="formValidate.db16"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频2衰减</p>
          <FormItem label="6-18GHz射频衰减1"
                    prop="attenuation2618">
            <Select v-model="formValidate.attenuation2618"
                    placeholder="选择6-18GHz射频衰减1"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1前级"
                    prop="attenuationEarlyStage226">
            <Select v-model="formValidate.attenuationEarlyStage226"
                    placeholder="选择2-6GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="2-6GHz射频衰减1后级"
                    prop="attenuationLateStage226">
            <Select v-model="formValidate.attenuationLateStage226"
                    placeholder="选择2-6GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1前级"
                    prop="attenuationEarlyStage2082">
            <Select v-model="formValidate.attenuationEarlyStage2082"
                    placeholder="选择0.8-2GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.8-2GHz射频衰减1后级"
                    prop="attenuationLateStage2082">
            <Select v-model="formValidate.attenuationLateStage2082"
                    placeholder="选择0.8-2GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1前级"
                    prop="attenuationEarlyStage203808">
            <Select v-model="formValidate.attenuationEarlyStage203808"
                    placeholder="选择0.38-0.8GHz射频衰减1前级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="0.38-0.8GHz射频衰减1后级"
                    prop="attenuationLateStage203808">
            <Select v-model="formValidate.attenuationLateStage203808"
                    placeholder="选择0.38-0.8GHz射频衰减1后级"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">射频2长电缆均衡衰减控制</p>
          <FormItem label="控制0.5dB"
                    prop="db205">
            <Select v-model="formValidate.db205"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db21">
            <Select v-model="formValidate.db21"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db22">
            <Select v-model="formValidate.db22"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db24">
            <Select v-model="formValidate.db24"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db28">
            <Select v-model="formValidate.db28"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db216">
            <Select v-model="formValidate.db216"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">中频1衰减</p>
          <FormItem label="控制0.5dB"
                    prop="db305">
            <Select v-model="formValidate.db305"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db31">
            <Select v-model="formValidate.db31"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db32">
            <Select v-model="formValidate.db32"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db34">
            <Select v-model="formValidate.db34"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db38">
            <Select v-model="formValidate.db38"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db316">
            <Select v-model="formValidate.db316"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <Card style="display:block;width:100%;margin-bottom:15px;">
          <p style="font-size: 12px;font-weight: 800;margin-left: 10px;">中频2衰减</p>
          <FormItem label="控制0.5dB"
                    prop="db405">
            <Select v-model="formValidate.db405"
                    placeholder="选择控制0.5DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制1dB"
                    prop="db41">
            <Select v-model="formValidate.db41"
                    placeholder="选择控制1DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制2dB"
                    prop="db42">
            <Select v-model="formValidate.db42"
                    placeholder="选择控制2DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制4dB"
                    prop="db44">
            <Select v-model="formValidate.db44"
                    placeholder="选择控制4DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制8dB"
                    prop="db48">
            <Select v-model="formValidate.db48"
                    placeholder="选择控制8DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
          <FormItem label="控制16dB"
                    prop="db416">
            <Select v-model="formValidate.db416"
                    placeholder="选择控制16DB"
                    style="width:120px">
              <Option value="0">衰</Option>
              <Option value="1">不衰</Option>
            </Select>
          </FormItem>
        </Card>
        <FormItem label="衰减码控制方式"
                  prop="attenuationCodeControlMode">
          <Select v-model="formValidate.attenuationCodeControlMode"
                  placeholder="选择衰减码控制方式"
                  style="width:120px">
            <Option value="0">从衰减表读</Option>
            <Option value="1">上机位控制</Option>
          </Select>
        </FormItem>
        <FormItem label="自检源衰减"
                  prop="selfCheckingSourceAttenuation">
          <Input v-model="formValidate.selfCheckingSourceAttenuation"
                 placeholder="自检源衰减"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="脉内引导批次号开关"
                  prop="batchNumberSwitch">
          <Select v-model="formValidate.batchNumberSwitch"
                  placeholder="选择脉内引导批次号开关"
                  style="width:120px">
            <Option value="0">关闭</Option>
            <Option value="1">打开</Option>
          </Select>
        </FormItem>
        <FormItem label="脉内引导批次号"
                  prop="batchNumber">
          <Input v-model="formValidate.batchNumber"
                 placeholder="脉内引导批次号"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="故障检测门限"
                  prop="faultDetectionThreshold">
          <Input v-model="formValidate.faultDetectionThreshold"
                 placeholder="故障检测门限"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="单次执行指令集所需时间"
                  prop="timeRequired">
          <Input v-model="formValidate.timeRequired"
                 placeholder="单次执行指令集所需时间"
                 style="width:120px"></Input>
        </FormItem>
        <p style="font-size: 14px;font-weight: 800;margin-left: 10px;">敌我侦察指令</p>
        <FormItem label="天线选择"
                  prop="antennaSelection">
          <Select v-model="formValidate.antennaSelection"
                  style="width:120px">
            <Option value="0">合批</Option>
            <Option value="1">天线1</Option>
            <Option value="2">天线2</Option>
            <Option value="3">天线3</Option>
          </Select>
        </FormItem>
        <FormItem label="分机IP重构"
                  prop="IPReconsitution">
          <Select v-model="formValidate.IPReconsitution"
                  style="width:120px">
            <Option value="0">IP不重构</Option>
            <Option value="1">IP重构</Option>
          </Select>
        </FormItem>
        <FormItem label="中频采集模式"
                  prop="IfAcquisitionMode">
          <Select v-model="formValidate.IfAcquisitionMode"
                  style="width:120px">
            <Option value="0">盲采</Option>
            <Option value="1">VP采</Option>
            <Option value="2">模式采</Option>
          </Select>
        </FormItem>
        <FormItem label="中频采集时间"
                  prop="IfAcquisitionTime">
          <Input v-model="formValidate.IfAcquisitionTime"
                 placeholder="time now"
                 style="width: 150px" />
        </FormItem>
        <Button type="success"
                style="margin-right:10px;margin-left:40px"
                @click="getTimeNow">获取中频采集时间</Button>
        <FormItem label="FPGA重构标识"
                  prop="FPGAReconsitution">
          <Select v-model="formValidate.FPGAReconsitution"
                  style="width:130px">
            <Option value="5533">FPGA1重构烧写</Option>
            <Option value="5522">FPGA1重构擦除</Option>
            <Option value="BB33">FPGA2重构擦除</Option>
            <Option value="BB22">FPGA2重构擦除</Option>
          </Select>
        </FormItem>
        <FormItem label="DSP重构标识"
                  prop="DSPReconsitution">
          <Select v-model="formValidate.DSPReconsitution"
                  style="width:120px">
            <Option value="AA33">DSP重构烧写</Option>
            <Option value="AA22">DSP重构擦除</Option>
          </Select>
        </FormItem>
        <FormItem prop="PDW740"
                  label="740PDW个数">
          <Input v-model="formValidate.PDW740"
                 placeholder="740PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem prop="PDW837"
                  label="837.5PDW个数">
          <Input v-model="formValidate.PDW837"
                 placeholder="837.5PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem prop="PDW1030"
                  label="1030PDW个数">
          <Input v-model="formValidate.PDW1030"
                 placeholder="1030PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem prop="PDW1059"
                  label="1059PDW个数">
          <Input v-model="formValidate.PDW1059"
                 placeholder="1059PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem prop="PDW1090"
                  label="1090PDW个数">
          <Input v-model="formValidate.PDW1090"
                 placeholder="1090PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="1464PDW个数"
                  prop="PDW1464">
          <Input v-model="formValidate.PDW1464"
                 placeholder="1464PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem prop="PDW1532"
                  label="1532PDW个数">
          <Input v-model="formValidate.PDW1532"
                 placeholder="1532PDW个数"
                 style="width:120px"></Input>
        </FormItem>
        <FormItem label="频段模式"
                  prop="frequencyBandmodel">
          <Select v-model="formValidate.frequencyBandmodel"
                  style="width:120px">
            <Option value="0">PDW</Option>
            <Option value="1">IFF</Option>
            <Option value="2">IFF+中频</Option>
          </Select>
        </FormItem>
        <FormItem label="内外秒脉冲选择"
                  prop="PulseChoice">
          <Select v-model="formValidate.PulseChoice"
                  style="width:120px">
            <Option value="0">内部</Option>
            <Option value="1">外部</Option>
          </Select>
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
    const validateMobile = (rule, value, callback) => {
      if (parseInt(value) < 0) {
        callback(new Error('数值不能为负'))
      } else {
        callback()
      }
    }
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
      radarExtensionCode: '0',
      radarExtensionNum: 0,
      radarSystemCode: '0',
      radarSystemNum: 0,
      extensionNum: 0,
      systemNum: 0,
      dialogVisible: false,
      dialogVisible1: false,
      arr: [],
      res: {},
      arr1: [],
      res1: {},
      dialogExtension: {
        pulse: '0',
        watchdogOpen: '0', // 下面为分机控制字字段
        state: '0',
        open: '0',
        transformModal: '0',
        dealmodal: '0',
        calibrationModal: '0',
        selectcalibration: '0', // 分机控制字段结束
        threshold: 1,
        overallpulse: 100,
        minamplitude: 0,
        maxamplitude: 255,
        minPulsewidth: 1,
        maxPulsewidth: 30000,
        filterMaximumFrequency: 955,
        filterMinimumFrequency: 545,
        shieldingMaximumFrequency: 0,
        shieldingMinimumFrequency: 0,
        defalutUpdate: '0'
      },
      dialogSystem: {
        workPattern: '0', // 系统控制指令开始
        workPeriod: '1',
        workPeriodNum: 1,
        initialFrequency: 1,
        terminationFrequency: 1,
        steppedFrequency: 1,
        bandWidthSelection: '0',
        antennaSelection1: '0',
        antennaSelection2: '0',
        db05: '0', // 中频1衰减控制
        db1: '0',
        db2: '0',
        db4: '0',
        db8: '0',
        db16: '0', // 结束
        db205: '0', // 中频2衰减控制
        db21: '0',
        db22: '0',
        db24: '0',
        db28: '0',
        db216: '0', // 结束
        db305: '0', // 中频1衰减
        db31: '0',
        db32: '0',
        db34: '0',
        db38: '0',
        db316: '0', // 结束
        db405: '0', // 中频2衰减
        db41: '0',
        db42: '0',
        db44: '0',
        db48: '0',
        db416: '0', // 结束
        attenuation1618: '0', // 射频1衰减字段开始
        attenuationEarlyStage126: '0',
        attenuationLateStage126: '0',
        attenuationEarlyStage1082: '0',
        attenuationLateStage1082: '0',
        attenuationEarlyStage103808: '0',
        attenuationLateStage103808: '0', // 结束
        // attenuationControl1: '0',
        attenuation2618: '0', // 射频2衰减字段开始
        attenuationEarlyStage226: '0',
        attenuationLateStage226: '0',
        attenuationEarlyStage2082: '0',
        attenuationLateStage2082: '0',
        attenuationEarlyStage203808: '0',
        attenuationLateStage203808: '0', // 结束
        // attenuationControl2: '0',
        midCut1: '0',
        midCut2: '0',
        attenuationCodeControlMode: '0',
        selfCheckingSourceAttenuation: '1',
        batchNumberSwitch: '0',
        batchNumber: '1',
        faultDetectionThreshold: '1',
        timeRequired: '1'
      },
      formValidate: {
        cmd: '1',
        pulse: '0', // 雷达分机指令开始
        watchdogOpen: '0', // 下面为分机控制字字段
        state: '0',
        open: '0',
        PulseChoice: '0',
        transformModal: '0',
        dealmodal: '0',
        calibrationModal: '0',
        selectcalibration: '0', // 分机控制字段结束
        threshold: 1,
        overallpulse: 100,
        minamplitude: 0,
        maxamplitude: 255,
        minPulsewidth: 1,
        maxPulsewidth: 30000,
        filterMaximumFrequency: 955,
        filterMinimumFrequency: 545,
        shieldingMaximumFrequency: 0,
        shieldingMinimumFrequency: 0,
        defalutUpdate: '0',
        bandWidth1: '0', // 带宽选择字段拼接开始
        bandWidth2: '0',
        bandWidth3: '0',
        bandWidth4: '0',
        bandWidth5: '1',
        bandWidth6: '1', // 带宽选择字段拼接结束
        workPattern: '0', // 系统控制指令开始
        workPeriod: '1',
        workPeriodNum: 1,
        initialFrequency: 1,
        terminationFrequency: 1,
        steppedFrequency: 1,
        bandWidthSelection: '0',
        antennaSelection1: '0',
        antennaSelection2: '0',
        db05: '0', // 射频1衰减控制
        db1: '0',
        db2: '0',
        db4: '0',
        db8: '0',
        db16: '0', // 结束
        db205: '0', // 射频2衰减控制
        db21: '0',
        db22: '0',
        db24: '0',
        db28: '0',
        db216: '0', // 结束
        db305: '0', // 中频1衰减
        db31: '0',
        db32: '0',
        db34: '0',
        db38: '0',
        db316: '0', // 结束
        db405: '0', // 中频2衰减
        db41: '0',
        db42: '0',
        db44: '0',
        db48: '0',
        db416: '0', // 结束
        attenuation1618: '0', // 射频1衰减字段开始
        attenuationEarlyStage126: '0',
        attenuationLateStage126: '0',
        attenuationEarlyStage1082: '0',
        attenuationLateStage1082: '0',
        attenuationEarlyStage103808: '0',
        attenuationLateStage103808: '0', // 结束
        // attenuationControl1: '0',
        attenuation2618: '0', // 射频2衰减字段开始
        attenuationEarlyStage226: '0',
        attenuationLateStage226: '0',
        attenuationEarlyStage2082: '0',
        attenuationLateStage2082: '0',
        attenuationEarlyStage203808: '0',
        attenuationLateStage203808: '0', // 结束
        // attenuationControl2: '0',
        midCut1: '0',
        midCut2: '0',
        attenuationCodeControlMode: '0',
        selfCheckingSourceAttenuation: '1',
        batchNumberSwitch: '0',
        batchNumber: '1',
        faultDetectionThreshold: '1',
        timeRequired: '1',
        antennaSelection: '0', // 敌我指令开始
        IPReconsitution: '0',
        IfAcquisitionMode: '0',
        IfAcquisitionTime: '',
        FPGAReconsitution: '5533',
        DSPReconsitution: 'AA33',
        PDW740: '1',
        PDW837: '1',
        PDW1030: '1',
        PDW1059: '1',
        PDW1090: '1',
        PDW1464: '1',
        PDW1532: '1',
        frequencyBandmodel: '1',
        count: 1
      },
      ruleValidate: {
        cmd: [
          { required: true, message: '请选择指令有效标记', trigger: 'change' }
        ],
        pulse: [
          { required: true, message: '请选择内外秒脉冲', trigger: 'change' }
        ],
        threshold: [
          { required: true, type: 'number', message: '输入门限', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        overallpulse: [
          { required: true, type: 'number', message: '输入全脉冲数量', trigger: 'blur' }
        ],
        minamplitude: [
          { required: true, type: 'number', message: '输入最小幅度', trigger: 'blur' }
        ],
        maxamplitude: [
          { required: true, type: 'number', message: '输入最大幅度', trigger: 'blur' }
        ],
        minPulsewidth: [
          { required: true, type: 'number', message: '输入最小脉宽', trigger: 'blur' }
        ],
        maxPulsewidth: [
          { required: true, type: 'number', message: '输入最大脉宽', trigger: 'blur' }
        ],
        filterMaximumFrequency: [
          { required: true, type: 'number', message: '最大频率', trigger: 'blur' }
        ],
        filterMinimumFrequency: [
          { required: true, type: 'number', message: '最小频率', trigger: 'blur' }
        ],
        shieldingMaximumFrequency: [
          { required: true, type: 'number', message: '屏蔽最大频率', trigger: 'blur' }
        ],
        shieldingMinimumFrequency: [
          { required: true, type: 'number', message: '屏蔽最小频率', trigger: 'blur' }
        ],
        defalutUpdate: [
          { required: true, type: 'string', message: '选择是否更新', trigger: 'change' }
        ],
        watchdogOpen: [
          { required: true, type: 'string', message: '选择看门狗开关', trigger: 'change' }
        ],
        state: [
          { required: true, type: 'string', message: '是否发送工作状态', trigger: 'change' }
        ],
        open: [
          { required: true, type: 'string', message: '合批开关', trigger: 'change' }
        ],
        transformModal: [
          { required: true, type: 'string', message: '选择脉冲类型', trigger: 'change' }
        ],
        dealmodal: [
          { required: true, type: 'string', message: '选择预处理模式', trigger: 'change' }
        ],
        calibrationModal: [
          { required: true, type: 'string', message: '校准模式', trigger: 'change' }
        ],
        selectcalibration: [
          { required: true, type: 'string', message: '校准选项', trigger: 'change' }
        ],
        workPattern: [
          { required: true, type: 'string', message: '选择工作方式', trigger: 'change' }
        ],
        bandWidth1: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        bandWidth2: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        bandWidth3: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        bandWidth4: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        bandWidth5: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        bandWidth6: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        workPeriod: [
          { required: true, type: 'string', message: '填写工作周期', trigger: 'blur' }
        ],
        workPeriodNum: [
          { required: true, type: 'number', message: '工作周期数', trigger: 'blur' }
        ],
        steppedFrequency: [
          { required: true, type: 'number', message: '频率步进', trigger: 'blur' }
        ],
        initialFrequency: [
          { required: true, type: 'number', message: '起始频率', trigger: 'blur' }
        ],
        terminationFrequency: [
          { required: true, type: 'number', message: '终止频率', trigger: 'blur' }
        ],
        bandWidthSelection: [
          { required: true, type: 'string', message: '选择带宽', trigger: 'change' }
        ],
        db05: [
          { required: true, type: 'string', message: '选择控制0.5dB', trigger: 'change' }
        ],
        db1: [
          { required: true, type: 'string', message: '选择控制1dB', trigger: 'change' }
        ],
        db2: [
          { required: true, type: 'string', message: '选择控制2dB', trigger: 'change' }
        ],
        db4: [
          { required: true, type: 'string', message: '选择控制4dB', trigger: 'change' }
        ],
        db8: [
          { required: true, type: 'string', message: '选择控制8dB', trigger: 'change' }
        ],
        db16: [
          { required: true, type: 'string', message: '选择控制16dB', trigger: 'change' }
        ],
        antennaSelection2: [
          { required: true, type: 'string', message: '选择天线2', trigger: 'change' }
        ],
        attenuation1618: [
          { required: true, type: 'string', message: '选择射频衰减1', trigger: 'change' }
        ],
        attenuationEarlyStage126: [
          { required: true, type: 'string', message: '选择2-6GHz射频衰减1前期', trigger: 'change' }
        ],
        attenuationLateStage126: [
          { required: true, type: 'string', message: '选择2-6GHz射频衰减1后期', trigger: 'change' }
        ],
        attenuationEarlyStage1082: [
          { required: true, type: 'string', message: '选择0.8-2GHz射频衰减1前期', trigger: 'change' }
        ],
        attenuationLateStage1082: [
          { required: true, type: 'string', message: '选择0.8-2GHz射频衰减1后期', trigger: 'change' }
        ],
        attenuationEarlyStage103808: [
          { required: true, type: 'string', message: '选择0.38-0.8GHz射频衰减1前期', trigger: 'change' }
        ],
        attenuationLateStage103808: [
          { required: true, type: 'string', message: '选择0.38-0.8GHz射频衰减1后期', trigger: 'change' }
        ],
        antennaSelection1: [
          { required: true, type: 'string', message: '选择天线1', trigger: 'change' }
        ],
        attenuation2618: [
          { required: true, type: 'string', message: '选择射频衰减1', trigger: 'change' }
        ],
        attenuationEarlyStage226: [
          { required: true, type: 'string', message: '选择2-6GHz射频衰减1前期', trigger: 'change' }
        ],
        attenuationLateStage226: [
          { required: true, type: 'string', message: '选择2-6GHz射频衰减1后期', trigger: 'change' }
        ],
        attenuationEarlyStage2082: [
          { required: true, type: 'string', message: '选择0.8-2GHz射频衰减1前期', trigger: 'change' }
        ],
        attenuationLateStage2082: [
          { required: true, type: 'string', message: '选择0.8-2GHz射频衰减1后期', trigger: 'change' }
        ],
        attenuationEarlyStage203808: [
          { required: true, type: 'string', message: '选择0.38-0.8GHz射频衰减1前期', trigger: 'change' }
        ],
        attenuationLateStage203808: [
          { required: true, type: 'string', message: '选择0.38-0.8GHz射频衰减1后期', trigger: 'change' }
        ],
        db205: [
          { required: true, type: 'string', message: '选择控制0.5dB', trigger: 'change' }
        ],
        db21: [
          { required: true, type: 'string', message: '选择控制1dB', trigger: 'change' }
        ],
        db22: [
          { required: true, type: 'string', message: '选择控制2dB', trigger: 'change' }
        ],
        db24: [
          { required: true, type: 'string', message: '选择控制4dB', trigger: 'change' }
        ],
        db28: [
          { required: true, type: 'string', message: '选择控制8dB', trigger: 'change' }
        ],
        db216: [
          { required: true, type: 'string', message: '选择控制16dB', trigger: 'change' }
        ],
        db305: [
          { required: true, type: 'string', message: '选择控制0.5dB', trigger: 'change' }
        ],
        db31: [
          { required: true, type: 'string', message: '选择控制1dB', trigger: 'change' }
        ],
        db32: [
          { required: true, type: 'string', message: '选择控制2dB', trigger: 'change' }
        ],
        db34: [
          { required: true, type: 'string', message: '选择控制4dB', trigger: 'change' }
        ],
        db38: [
          { required: true, type: 'string', message: '选择控制8dB', trigger: 'change' }
        ],
        db316: [
          { required: true, type: 'string', message: '选择控制16dB', trigger: 'change' }
        ],
        db405: [
          { required: true, type: 'string', message: '选择控制0.5dB', trigger: 'change' }
        ],
        db41: [
          { required: true, type: 'string', message: '选择控制1dB', trigger: 'change' }
        ],
        db42: [
          { required: true, type: 'string', message: '选择控制2dB', trigger: 'change' }
        ],
        db44: [
          { required: true, type: 'string', message: '选择控制4dB', trigger: 'change' }
        ],
        db48: [
          { required: true, type: 'string', message: '选择控制8dB', trigger: 'change' }
        ],
        db416: [
          { required: true, type: 'string', message: '选择控制16dB', trigger: 'change' }
        ],
        // midCut1: [
        //   { required: true, type: 'string', message: '选择中频1衰减', trigger: 'change' }
        // ],
        // midCut2: [
        //   { required: true, type: 'string', message: '选择中频2衰减', trigger: 'change' }
        // ],
        attenuationCodeControlMode: [
          { required: true, type: 'string', message: '选择衰减码控制方式', trigger: 'change' }
        ],
        batchNumberSwitch: [
          { required: true, type: 'string', message: '选择脉内引导批次号开关', trigger: 'change' }
        ],
        selfCheckingSourceAttenuation: [
          { required: true, type: 'string', message: '请填写自检源衰减', trigger: 'blur' }
        ],
        batchNumber: [
          { required: true, type: 'string', message: '请填写脉内引导批次号', trigger: 'blur' }
        ],
        faultDetectionThreshold: [
          { required: true, type: 'string', message: '请填写故障检测门限', trigger: 'blur' }
        ],
        timeRequired: [
          { required: true, type: 'string', message: '请填写单次执行指令集所需时间', trigger: 'blur' }
        ],
        PulseChoice: [
          { required: true, type: 'string', message: '选择内外秒脉冲', trigger: 'change' }
        ],
        antennaSelection: [
          { required: true, type: 'string', message: '选择天线', trigger: 'change' }
        ],
        IPReconsitution: [
          { required: true, type: 'string', message: '选择分机IP重构', trigger: 'change' }
        ],
        IfAcquisitionMode: [
          { required: true, type: 'string', message: '选择中频采集模式', trigger: 'change' }
        ],
        IfAcquisitionTime: [
          { required: true, type: 'string', message: '获取中频采集时间', trigger: 'blur' }
        ],
        FPGAReconsitution: [
          { required: true, type: 'string', message: '选择FPGA重构标识', trigger: 'change' }
        ],
        DSPReconsitution: [
          { required: true, type: 'string', message: '选择DSP重构标识', trigger: 'change' }
        ],
        PDW740: [
          { required: true, type: 'string', message: '填写740PDW个数', trigger: 'blur' }
        ],
        PDW837: [
          { required: true, type: 'string', message: '填写837.5PDW个数', trigger: 'blur' }
        ],
        PDW1030: [
          { required: true, type: 'string', message: '填写1030PDW个数', trigger: 'blur' }
        ],
        PDW1059: [
          { required: true, type: 'string', message: '填写1059PDW个数', trigger: 'blur' }
        ],
        PDW1090: [
          { required: true, type: 'string', message: '填写1090PDW个数', trigger: 'blur' }
        ],
        PDW1464: [
          { required: true, type: 'string', message: '选择1464PDW个数', trigger: 'change' }
        ],
        PDW1532: [
          { required: true, type: 'string', message: '填写1532PDW个数', trigger: 'blur' }
        ],
        frequencyBandmodel: [
          { required: true, type: 'string', message: '选择频段模式', trigger: 'change' }
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
    mapformValidate () {
      // 返回分机控制字里的状态码
      let obj = {
        watchdogOpen: '0', // 下面为分机控制字字段
        state: '0',
        open: '0',
        transformModal: '0',
        dealmodal: '0',
        calibrationModal: '0',
        selectcalibration: '0'
      }
      let str = ''
      let result = {}
      for (let items in this.formValidate) {
        result[items] = this.formValidate[items]
      }
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
          delete result[items]
        }
      }
      result.extensionControlCharacter = str
      return str
    },
    mapformExtension () {
      // 返回分机控制字里的状态码
      let obj = {
        watchdogOpen: '0', // 下面为分机控制字字段
        state: '0',
        open: '0',
        transformModal: '0',
        dealmodal: '0',
        calibrationModal: '0',
        selectcalibration: '0'
      }
      let str = ''
      let result = {}
      for (let items in this.dialogExtension) {
        result[items] = this.dialogExtension[items]
      }
      for (let items in obj) {
        if (this.dialogExtension[items]) {
          str += this.dialogExtension[items]
          delete result[items]
        }
      }
      result.extensionControlCharacter = str
      return str
    },
    attenuationMap1 () {
      let obj = {
        attenuation1618: '0', // 射频1衰减字段开始
        attenuationEarlyStage126: '0',
        attenuationLateStage126: '0',
        attenuationEarlyStage1082: '0',
        attenuationLateStage1082: '0',
        attenuationEarlyStage103808: '0',
        attenuationLateStage103808: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    attenuationSystemMap1 () {
      let obj = {
        attenuation1618: '0', // 射频1衰减字段开始
        attenuationEarlyStage126: '0',
        attenuationLateStage126: '0',
        attenuationEarlyStage1082: '0',
        attenuationLateStage1082: '0',
        attenuationEarlyStage103808: '0',
        attenuationLateStage103808: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.dialogSystem[items]) {
          str += this.dialogSystem[items]
        }
      }
      return str
    },
    attenuationSystemMap2 () {
      let obj = {
        attenuation2618: '0', // 射频2衰减字段开始
        attenuationEarlyStage226: '0',
        attenuationLateStage226: '0',
        attenuationEarlyStage2082: '0',
        attenuationLateStage2082: '0',
        attenuationEarlyStage203808: '0',
        attenuationLateStage203808: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.dialogSystem[items]) {
          str += this.dialogSystem[items]
        }
      }
      return str
    },
    attenuationControlMap1 () {
      let obj = {
        db05: '0', // 射频1衰减控制
        db1: '0',
        db2: '0',
        db4: '0',
        db8: '0',
        db16: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.dialogSystem[items]) {
          str += this.dialogSystem[items]
        }
      }
      return str
    },
    attenuationControlMap2 () {
      let obj = {
        db205: '0', // 射频2衰减控制
        db21: '0',
        db22: '0',
        db24: '0',
        db28: '0',
        db216: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.dialogSystem[items]) {
          str += this.dialogSystem[items]
        }
      }
      return str
    },
    midCutControlMap1 () {
      let obj = {
        db305: '0', // 中频1衰减
        db31: '0',
        db32: '0',
        db34: '0',
        db38: '0',
        db316: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.dialogSystem[items]) {
          str += this.dialogSystem[items]
        }
      }
      return str
    },
    midCutControlMap2 () {
      let obj = {
        db405: '0', // 中频2衰减
        db41: '0',
        db42: '0',
        db44: '0',
        db48: '0',
        db416: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.dialogSystem[items]) {
          str += this.dialogSystem[items]
        }
      }
      return str
    },
    checkExtensionNum () {
      const urlN = '/deployment/sendExtensionInstructionsCMD/communication'
      this.extension(urlN)
      this.extensionNum++
    },
    checkSystemNum () {
      const urlN = '/deployment/sendSystemInstructionsCMD/communication'
      this.system(urlN)
      this.systemNum++
    },
    addExtension () { // 添加的时候
      if (this.radarSystemNum === 0) {
        this.radarExtensionNum += 1
        this.res = this.dialogExtension
        this.res.extensionControlCharacter = this.mapformExtension()
        this.res.count = this.formValidate.count
        this.res.radarExtensionNum = this.radarExtensionNum
        let updateAll1
        if (this.updateAll === false) {
          updateAll1 = 0
        } else if (this.updateAll === true) {
          updateAll1 = 1
        }
        this.res.updateAll = updateAll1
        this.res.host = this.hostlist[this.device - 1].host
        this.arr.push(this.res)
      } else if (this.radarSystemNum > 0) {
        this.radarSystemNum = 0
        this.$Message.error({
          content: '分机指令与系统指令不可同时发送',
          duration: 1
        })
        this.arr = []
      }
    },
    addSystem () { // 添加的时候
      if (this.radarExtensionNum === 0) {
        this.radarSystemNum += 1
        this.res1 = this.dialogSystem
        this.res1.radioFrequencyAttenuation1 = this.attenuationSystemMap1()
        this.res1.radioFrequencyAttenuation2 = this.attenuationSystemMap2()
        this.res1.attenuationControl1 = this.attenuationControlMap1()
        this.res1.attenuationControl2 = this.attenuationControlMap2()
        this.res1.midCut1 = this.midCutControlMap1()
        this.res1.midCut2 = this.midCutControlMap2()
        this.res1.count = this.formValidate.count
        this.res1.radarSystemNum = this.radarSystemNum
        let updateAll1
        if (this.updateAll === false) {
          updateAll1 = 0
        } else if (this.updateAll === true) {
          updateAll1 = 1
        }
        this.res1.updateAll = updateAll1
        this.res1.host = this.hostlist[this.device - 1].host
        this.arr1.push(this.res1)
      } else if (this.radarExtensionNum > 0) {
        this.radarExtensionNum = 0
        this.$Message.error({
          content: '分机指令与系统指令不可同时发送',
          duration: 1
        })
        this.arr1 = []
      }
    },
    saveDialogExtension () { // 修改的时候
      this.arr.pop()
      this.res = this.dialogExtension
      this.res.extensionControlCharacter = this.mapformExtension()
      this.res.count = this.formValidate.count
      this.res.radarExtensionNum = this.radarExtensionNum
      let updateAll1
      if (this.updateAll === false) {
        updateAll1 = 0
      } else if (this.updateAll === true) {
        updateAll1 = 1
      }
      this.res.updateAll = updateAll1
      this.res.host = this.hostlist[this.device - 1].host
      this.arr.push(this.res)
    },
    saveDialogSystem () { // 修改的时候
      this.arr1.pop()
      this.res1 = this.dialogSystem
      this.res1.radioFrequencyAttenuation1 = this.attenuationSystemMap1()
      this.res1.radioFrequencyAttenuation2 = this.attenuationSystemMap2()
      this.res1.attenuationControl1 = this.attenuationControlMap1()
      this.res1.attenuationControl2 = this.attenuationControlMap2()
      this.res1.midCut1 = this.midCutControlMap1()
      this.res1.midCut2 = this.midCutControlMap2()
      this.res1.count = this.formValidate.count
      this.res1.radarSystemNum = this.radarSystemNum
      let updateAll1
      if (this.updateAll === false) {
        updateAll1 = 0
      } else if (this.updateAll === true) {
        updateAll1 = 1
      }
      this.res1.updateAll = updateAll1
      this.res1.host = this.hostlist[this.device - 1].host
      this.arr1.push(this.res1)
    },
    sendExtension () {
      if (this.radarExtensionNum > 0) {
        for (let i = 0; i < this.radarExtensionNum; i++) {
          setTimeout(() => {
            this.checkExtensionNum()
          }, 500)
        }
      } else {
        this.$Message.error('请添加雷达分机指令')
      }
    },
    sendSystem () { // 发送雷达系统指令
      if (this.radarSystemNum > 0) {
        for (let i = 0; i < this.radarSystemNum; i++) {
          setTimeout(() => {
            this.checkSystemNum()
          }, 500)
        }
      } else {
        this.$Message.error('请添加雷达系统指令')
      }
    },
    extension (url) { // 分机指令
      post(url, this.res).then((data) => {
        if (data.code === 1) {
          setTimeout(() => {
            this.$Message.success('指令发送完成')
            this.$refs['formValidate'].resetFields()
          }, 1000)
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
    },
    modify () {
      this.dialogVisible = true
    },
    modify1 () {
      this.dialogVisible1 = true
    },
    system (url) { // 系统指令
      var dataTime = this.getTimeNow().split(' ')
      let splitdate = dataTime[0].split('-').splice(1, 2).join('')
      let splittime = dataTime[1].split(':').join('')
      this.res1.timingTimeCode = splitdate + splittime
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          post(url, this.res1).then((data) => {
            if (data.code === 1) {
              setTimeout(() => {
                this.$Message.success('指令发送完成')
                this.$refs['formValidate'].resetFields()
              }, 1000)
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
        } else {
          this.$Message.error('输入不完整')
        }
      })
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
        this.insObj.name = '设备工作流程控制'
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleClose1 (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    bandWidthMap () {
      let obj = {
        bandWidth1: '',
        bandWidth2: '',
        bandWidth3: '',
        bandWidth4: '',
        bandWidth5: '',
        bandWidth6: ''
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    midcutMap1 () {
      let obj = {
        db305: '0', // 中频1衰减
        db31: '0',
        db32: '0',
        db34: '0',
        db38: '0',
        db316: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    midcutMap2 () {
      let obj = {
        db405: '0', // 中频2衰减
        db41: '0',
        db42: '0',
        db44: '0',
        db48: '0',
        db416: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    antennaSelection1Map () {
      let obj = {
        db05: '0', // 中频1衰减控制
        db1: '0',
        db2: '0',
        db4: '0',
        db8: '0',
        db16: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    antennaSelection2Map () {
      let obj = {
        db205: '0', // 中频2衰减控制
        db21: '0',
        db22: '0',
        db24: '0',
        db28: '0',
        db216: '0' // 结束
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    attenuationMap2 () {
      let obj = {
        attenuation2618: '0', // 射频2衰减字段开始
        attenuationEarlyStage226: '0',
        attenuationLateStage226: '0',
        attenuationEarlyStage2082: '0',
        attenuationLateStage2082: '0',
        attenuationEarlyStage203808: '0',
        attenuationLateStage203808: '0'
      }
      let str = ''
      for (let items in obj) {
        if (this.formValidate[items]) {
          str += this.formValidate[items]
        }
      }
      return str
    },
    submitData () {
      const urlN = '/deployment/sendDeviceWorkFlowCMD/communication'
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
      this.formValidate.IfAcquisitionTime = date
      return date
    },
    timecode () {
      var dataTime = this.getTimeNow().split(' ')
      let splitdata = dataTime[0].split('-').reverse().join(':')
      let splittime = dataTime[1].split(':')
      splittime.splice(2, 1)
      let x = splittime.join(':')
      let y = x + ':' + splitdata
      return y
    },
    sendRequest (url) {
      var dataTime = this.getTimeNow().split(' ')
      let splitdata = dataTime[0].split('-').splice(1, 2).join('')
      let splittime = dataTime[1].split(':').join('')
      let extensionControlCharacter = this.mapformValidate()
      let radioFrequencyAttenuation1 = this.attenuationMap1()
      let radioFrequencyAttenuation2 = this.attenuationMap2()
      let datelocal = this.formValidate
      datelocal.timingTimeCode = splitdata + splittime
      datelocal.timeCode = this.timecode()
      datelocal.extensionControlCharacter = extensionControlCharacter
      datelocal.radioFrequencyAttenuation1 = radioFrequencyAttenuation1
      datelocal.radioFrequencyAttenuation2 = radioFrequencyAttenuation2
      datelocal.bandwidthChoose = this.bandWidthMap()
      datelocal.attenuationControl1 = this.antennaSelection1Map()
      datelocal.attenuationControl2 = this.antennaSelection2Map()
      datelocal.midCut1 = this.midcutMap1()
      datelocal.midCut2 = this.midcutMap2()
      datelocal.host = this.hostlist[this.device - 1].host
      datelocal.taskFlowNo = splitdata + splittime
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
            storage.set(this.equipmentID, { 'equipmentWorkflow': datelocal })
            this.$refs['formValidate'].resetFields()
            this.$Message.success('设定完成')
          }, 1000)
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
  },
  computed: {
    ...mapGetters(['hostlist'])
  }
}
</script>
<style scoped>
.content {
  width: 100%;
  padding: 10px 0 0 0;
  position: relative;
}
.inp div {
  width: 250px;
  display: inline-block;
}
.ivu-form-item-content {
  display: inline-block;
  margin-left: 0;
}
.ivu-modal .ivu-form-item-content {
  margin-left: 0;
  display: inline-block;
}
</style>
