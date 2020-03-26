<template>
  <div class="order">
    <a-form-model layout="inline" :model="form" labelAlign="left">
      <a-form-model-item label="订单成本">
        <a-input style="width: 240px;" disabled v-model="form.cost" />
      </a-form-model-item>

      <a-form-model-item label="排期时间">
        <a-input style="width: 240px;" disabled v-model="form.schedule" />
      </a-form-model-item>

      <a-form-model-item label="所属销售">
        <a-input style="width: 240px;" disabled v-model="form.saleName" />
      </a-form-model-item>

      <a-form-model-item label="定金">
        <a-input-number style="width: 240px;" :disabled="!recored.isEdit" v-model="form.payment" />
      </a-form-model-item>

      <a-form-model-item label="是否含税">
        <a-input style="width: 240px;" disabled v-model="form.isIssue" />
      </a-form-model-item>

      <a-form-model-item label="进项税">
        <a-input style="width: 240px;" disabled v-model="form.outputTax" />
      </a-form-model-item>

      <a-form-model-item label="所属客户">
        <a-input style="width: 240px;" disabled v-model="form.accountName" />
      </a-form-model-item>

      <a-form-model-item label="备注">
        <a-textarea
          style="width: 240px;"
          :disabled="!recored.isEdit"
          v-model="form.saleRemark"
          :autoSize="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-model-item>

      <a-form-model-item label>
        <a-button @click="onCancel">取消</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">确定</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { orderDetail } from '@/api/channel'
import { addOrderUpdate } from '@/api/market'

@Component
export default class Order extends Vue {
  @Prop() private recored!: any

  private accountList!: any
  private form!: any

  private data() {
    return {
      accountList: [],
      form: {
        cost: undefined,
        schedule: undefined,
        saleName: undefined,
        payment: undefined,
        taxType: undefined,
        outputTax: undefined,
        accountName: undefined,
        saleRemark: undefined
      }
    }
  }

  @Emit('onClose')
  private onClose(isCLose: boolean) {
    return isCLose
  }

  @Watch('recored', { immediate: true, deep: true })
  private watchForm(value: any) {
    if (value.id) {
      this.$nextTick(() => {
        orderDetail({ orderId: value.id }).then((res: any) => {
          if (res.code === 200) {
            Object.assign(this.form, res.order)
            console.log(this.form)
            const { form } = this
            if (form) {
              form.taxType =
                form.taxType === 1
                  ? '专三'
                  : form.taxType === 2
                  ? '专六'
                  : form.taxType === 3
                  ? '普票'
                  : '无'
            }
          }
        })
      })
    }
  }

  private onSubmit() {
    const { form } = this
    if (form) {
      form.taxType =
        form.taxType === '专三'
          ? 1
          : form.taxType === '专六'
          ? 2
          : form.taxType === '普票'
          ? 3
          : 5

      addOrderUpdate(form)
        .then((res: any) => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.onClose(false)
          } else {
            this.$message.error(res.message)
            this.onClose(true)
          }
        })
        .catch(() => {
          this.onClose(true)
        })

      this.form = form
    }
  }

  private onCancel() {
    this.onClose(false)
  }
}
</script>

<style lang="less" scoped>
.order {
  /deep/ .ant-form-item-label {
    width: 120px;
  }

  /deep/ .ant-form-inline .ant-form-item {
    margin: 6px 0;
    width: 100%;
  }
}
</style>
