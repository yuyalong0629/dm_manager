<template>
  <div class="order">
    <a-form-model layout="inline" :rules="rules" ref="ruleForm" :model="form">
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="抖音号" prop="accountName">
            <a-input style="width: 240px;" v-model="form.accountName" placeholder="请输入抖音号名字" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="抖音号ID" prop="accountId">
            <a-input style="width: 240px;" v-model="form.accountId" placeholder="请输入抖音号ID" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="所属类别" prop="accountTypeId">
            <a-select style="width: 240px;" v-model="form.accountTypeId" placeholder="请选择所属类别">
              <a-select-option v-for="item of accountTypes" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="所属地区" prop="areaId">
            <a-select style="width: 240px" v-model="form.areaId" placeholder="请选择所属地区">
              <a-select-option v-for="item of areas" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="刊例" prop="firstPrice">
            <a-input style="width: 240px;" v-model="form.firstPrice" placeholder="请输入刊例" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="成本" prop="firstCost">
            <a-input style="width: 240px;" v-model="form.firstCost" placeholder="请输入成本" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="视频时长" prop="durationTime">
            <a-input style="width: 240px;" v-model="form.durationTime" placeholder="请输入视频时长" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="保留时长" prop="retentionTime">
            <a-input style="width: 240px;" v-model="form.retentionTime" placeholder="请输入保留时长" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="抖音号属性" prop="accountType">
            <a-select style="width: 240px" v-model="form.accountType" placeholder="请选择抖音号属性">
              <a-select-option v-for="item of accountTypeList" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="是否星图" prop="isStarmap">
            <a-select style="width: 240px" v-model="form.isStarmap" placeholder="请选择是否星图">
              <a-select-option v-for="item of isStarmapList" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="所属运营渠道" prop="finId">
            <a-select style="width: 240px" v-model="form.finId" placeholder="请选择所属运营渠道">
              <a-select-option v-for="item of admins" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <!-- <a-col :span="12">
          <a-form-model-item label="抖音号分类" prop="accountState">
            <a-select style="width: 240px" v-model="form.accountState" placeholder="请选择抖音号分类">
              <a-select-option v-for="item of accountStateList" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>-->

        <a-col :span="12">
          <a-form-model-item label="所属公司" prop="company">
            <a-input style="width: 240px;" v-model="form.company" placeholder="请输入所属公司" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="粉丝数(W)" prop="fans">
            <a-input style="width: 240px;" v-model="form.fans" placeholder="请输入粉丝数" />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item label="渠道联系方式" prop>
            <a-input
              style="width: 240px;"
              v-model="form.phone"
              addonBefore="手机"
              placeholder="请输入粉丝数"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item :colon="false" label=" " prop>
            <a-input
              style="width: 240px;"
              v-model="form.weiXin"
              addonBefore="微信"
              placeholder="请输入粉丝数"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item :colon="false" label=" " prop>
            <a-input
              style="width: 240px;"
              v-model="form.kouKou"
              addonBefore="QQ"
              placeholder="请输入粉丝数"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="12" style="height: 88px;">
          <a-form-model-item label="备注" prop>
            <a-textarea
              style="width: 240px;"
              v-model="form.remark"
              placeholder="请输入备注"
              :autoSize="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="20" :offset="3">
          <a-form-model-item>
            <a-button style="margin-right: 12px;" @click="handleCancel">取消</a-button>
            <a-button type="primary" @click="handleSubmit">确定</a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { addOrUpdate } from '@/api/channel'

interface ValueType {
  [key: string]: string | number
}

@Component
export default class Order extends Vue {
  @Prop() private recored!: any
  @Prop() private admins!: any
  @Prop() private areas!: any
  @Prop() private accountTypes!: any

  private form!: any
  private rules!: any

  private data() {
    return {
      accountTypeList: [
        { label: '自媒体', value: 1 },
        { label: '营销号', value: 2 }
      ],
      accountStateList: [
        { label: '订阅号', value: 1 },
        { label: '服务号', value: 2 }
      ],
      isStarmapList: [
        { label: '否', value: 0 },
        { label: '是', value: 1 }
      ],
      form: {
        accountName: undefined, // 抖音号名字
        accountId: undefined, // 抖音号ID
        accountTypeId: undefined, // 所属分类
        areaId: undefined, // 所属地区
        finId: undefined, //  所属渠道
        fans: undefined, // 粉丝量
        firstPrice: undefined, // 首条刊例
        firstCost: undefined, // 首条成本
        secondPrice: undefined, // 次条刊例
        secondCost: undefined, // 次条成本
        threePrice: undefined, // 3-N条条刊例
        threeCost: undefined, // 3-N条条成本
        accountType: undefined, // 抖音号属性
        accountState: 6, // 抖音号分类 1订阅号 2服务号 3 B站 4 微博号 5小红书 6 抖音号 7 快手号  8美拍号 9直播号
        remark: undefined, // 备注
        phone: undefined, // 抖音号电话（都有）
        kouKou: undefined, // 抖音号扣扣（都有）
        weiXin: undefined, // 抖音号微信（都有）
        company: undefined, // 公司
        durationTime: undefined, // 视频时长（直播、抖音、B站，美拍号）
        isStarmap: undefined, // 是否星图（抖音）
        retentionTime: undefined, // 保留时长（快手、抖音、B站，美拍号）
        isLink: undefined, // 是否外链（快手）
        isQuickorder: undefined, // 是否快接单（快手）
        isMeipai: undefined, // 是否M美拍（美拍）
        terrace: undefined // 所属平台 （直播）
      },
      rules: {
        accountName: [
          {
            required: true,
            message: '请输入抖音号名字',
            trigger: 'blur'
          }
        ],
        accountId: [
          {
            required: true,
            message: '请输入抖音号ID',
            trigger: 'blur'
          }
        ],
        accountTypeId: [
          {
            required: true,
            message: '请选择所属类别',
            trigger: 'blur'
          }
        ],
        areaId: [
          {
            required: true,
            message: '请选择所属地区',
            trigger: 'blur'
          }
        ],
        firstPrice: [
          {
            required: true,
            message: '请输入刊例',
            trigger: 'blur'
          }
        ],
        firstCost: [
          {
            required: true,
            message: '请输入成本',
            trigger: 'blur'
          }
        ],
        durationTime: [
          {
            required: true,
            message: '请输入视频时长',
            trigger: 'blur'
          }
        ],
        retentionTime: [
          {
            required: true,
            message: '请输入保留时长',
            trigger: 'blur'
          }
        ],
        isStarmap: [
          {
            required: true,
            message: '请输入是否星图',
            trigger: 'blur'
          }
        ],
        accountType: [
          {
            required: true,
            message: '请选择抖音号属性',
            trigger: 'blur'
          }
        ],
        finId: [
          {
            required: true,
            message: '请选择所属运营渠道',
            trigger: 'blur'
          }
        ],
        accountState: [
          {
            required: true,
            message: '请选择抖音号分类',
            trigger: 'blur'
          }
        ],
        company: [
          {
            required: true,
            message: '请输入所属公司',
            trigger: 'blur'
          }
        ],
        fans: [
          {
            required: true,
            message: '请输入粉丝',
            trigger: 'blur'
          }
        ]
      }
    }
  }

  private mounted() {
    this.$nextTick(() => {
      Object.assign(this.form, this.recored)
      console.log(this.form)
      // channelDetail({ accountId: this.recored.id }).then((res: any) => {
      // if (res.code === 200) {}
      // })
    })
  }

  // 提交
  private handleSubmit() {
    ;(this.$refs.ruleForm as any).validate((valid: any) => {
      if (valid) {
        const { form } = this
        addOrUpdate(form)
          .then((res: any) => {
            if (res.code === 200) {
              this.$message.success(res.message)
              this.onClose(false)
            } else {
              this.onClose(true)
              this.$message.error(res.message)
            }
          })
          .finally(() => {
            this.form = form
          })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  private handleCancel() {
    this.onClose(false)
  }

  @Emit('onClose')
  private onClose(isClose: boolean) {
    return isClose
  }
}
</script>

<style lang="less" scoped>
.order {
  /deep/ .ant-form-item-label {
    width: 100px;
    margin-right: 12px;
  }

  /deep/ .ant-col {
    height: 60px;
  }
}
</style>
