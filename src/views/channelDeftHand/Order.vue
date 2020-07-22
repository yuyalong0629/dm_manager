<template>
  <div class="order">
    <a-form-model layout="inline" :rules="rules" ref="ruleForm" :model="form">
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="快手号" prop="accountName">
            <a-input style="width: 240px;" v-model="form.accountName" placeholder="请输入快手号名字" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="快手号ID" prop="accountId">
            <a-input style="width: 240px;" v-model="form.accountId" placeholder="请输入快手号ID" />
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
            <a-input style="width: 240px;" v-model="form.firstPrice" placeholder="请输入专题刊例" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="成本" prop="firstCost">
            <a-input style="width: 240px;" v-model="form.firstCost" placeholder="请输入专题成本" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="保留时长" prop="retentionTime">
            <a-input style="width: 240px;" v-model="form.retentionTime" placeholder="请输入保留时长" />
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="快手号属性" prop="accountType">
            <a-select style="width: 240px" v-model="form.accountType" placeholder="请选择快手号属性">
              <a-select-option v-for="item of accountTypeList" :key="item.value">{{ item.label }}</a-select-option>
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

        <a-col :span="12">
          <a-form-model-item label="是否外链" prop="isLink">
            <a-select style="width: 240px" v-model="form.isLink" placeholder="请选择是否外链">
              <a-select-option v-for="item of isMeipai" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
          <a-form-model-item label="是否快接单" prop="isQuickorder">
            <a-select style="width: 240px" v-model="form.isQuickorder" placeholder="请选择是否快接单">
              <a-select-option v-for="item of isMeipai" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

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
              placeholder="请输入手机"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item :colon="false" label=" " prop>
            <a-input
              style="width: 240px;"
              v-model="form.weiXin"
              addonBefore="微信"
              placeholder="请输入微信"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24">
          <a-form-model-item :colon="false" label=" " prop>
            <a-input
              style="width: 240px;"
              v-model="form.kouKou"
              addonBefore="QQ"
              placeholder="请输入QQ"
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
            <a-button type="primary" :loading="loading" @click="handleSubmit">确定</a-button>
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
  private loading!: boolean

  private data() {
    return {
      loading: false,
      accountTypeList: [
        { label: '自媒体', value: 2 },
        { label: '营销号', value: 1 }
      ],
      accountStateList: [
        { label: '订阅号', value: 1 },
        { label: '服务号', value: 2 }
      ],
      isMeipai: [
        { label: '否', value: 0 },
        { label: '是', value: 1 }
      ],
      form: {
        accountName: undefined, // 快手号名字
        accountId: undefined, // 快手号ID
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
        accountType: undefined, // 快手号属性
        accountState: 7, // 快手号分类 1订阅号 2服务号 3 美拍 4 微博号 5小红书 6 快手号 7 快手号  8快手号 9直播号
        remark: undefined, // 备注
        phone: undefined, // 快手号电话（都有）
        kouKou: undefined, // 快手号扣扣（都有）
        weiXin: undefined, // 快手号微信（都有）
        company: undefined, // 公司
        durationTime: undefined, // 视频时长（直播、抖音、美拍，快手号）
        isStarmap: undefined, // 是否星图（抖音）
        retentionTime: undefined, // 保留时长（快手、抖音、美拍，快手号）
        isLink: undefined, // 是否外链（快手）
        isQuickorder: undefined, // 是否快接单（快手）
        isMeipai: undefined, // 是否M美拍（美拍）
        terrace: undefined // 所属平台 （直播）
      },
      rules: {
        accountName: [
          {
            required: true,
            message: '请输入快手号名字',
            trigger: 'blur'
          }
        ],
        accountId: [
          {
            required: true,
            message: '请输入快手号ID',
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
        secondPrice: [
          {
            required: true,
            message: '请输入植入刊例',
            trigger: 'blur'
          }
        ],
        secondCost: [
          {
            required: true,
            message: '请输入植入成本',
            trigger: 'blur'
          }
        ],
        isQuickorder: [
          {
            required: true,
            message: '请输入是否快接单',
            trigger: 'blur'
          }
        ],
        isLink: [
          {
            required: true,
            message: '请输入是否外链',
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
        isMeipai: [
          {
            required: true,
            message: '请输入是否快手号',
            trigger: 'blur'
          }
        ],
        accountType: [
          {
            required: true,
            message: '请选择快手号属性',
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
            message: '请选择快手号分类',
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
        this.loading = true
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
            this.loading = false
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
