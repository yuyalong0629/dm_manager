<template>
  <div class="order">
    <a-divider orientation="left">公众号信息</a-divider>
    <a-form-model layout="inline" labelAlign="left">
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="公众号">
            <span>学英语那点事</span>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-divider orientation="left">订单信息</a-divider>
    <a-form-model layout="inline" labelAlign="left">
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="公众号">
            <span>学英语那点事</span>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { channelDetail } from '@/api/channel'

@Component
export default class Order extends Vue {
  @Prop() private recored!: any

  private accountList!: any

  private data() {
    return {
      accountList: []
    }
  }

  private mounted() {
    this.$nextTick(() => {
      channelDetail({ accountId: this.recored.accountId }).then((res: any) => {
        if (res.code === 200) {
          this.accountList = [
            { label: '公众号', value: res.account.accountName },
            { label: '公众号ID', value: res.account.accountId },
            { label: '所属类别', value: res.account.accountTypeName },
            { label: '所属地区', value: res.account.areaName },
            { label: '首条刊例', value: res.account.firstPrice },
            { label: '首条成本', value: res.account.firstCost },
            { label: '次条刊例', value: res.account.secondPrice },
            { label: '次条成本', value: res.account.secondCost },
            { label: '3-N刊例', value: res.account.threePrice },
            { label: '3-N成本', value: res.account.threeCost },
            { label: '公众号属性', value: res.account.accountType },
            { label: '所属运营渠道', value: res.account.adminName },
            { label: '公众号分类', value: res.account.accountState },
            { label: '所属公司', value: res.account.company },
            { label: '粉丝数', value: res.account.fans },
            { label: '备注', value: res.account.remark },
            { label: '渠道联系方式', value: res.account.phone },
            { label: '渠道联系方式', value: res.account.weiXin },
            { label: '渠道联系方式', value: res.account.kouKou }
          ]
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
</style>
