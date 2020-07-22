<template>
  <div class="order">
    <a-spin :spinning="spinning">
      <!-- 编辑 -->
      <a-form-model v-if="!recored.isEdit" layout="inline">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="回款客户：">
              <a-select
                allowClear
                showSearch
                labelInValue
                :disabled="!recored.isEdit"
                v-model="order.customIdZ"
                :defaultActiveFirstOption="false"
                :showArrow="false"
                :filterOption="false"
                style="width: 220px;"
                placeholder="请选择回款客户"
                @search="fetchUser"
                @change="handleChange"
                @focus="handleFocus"
                :notFoundContent="null"
              >
                <a-select-option v-for="d in orderData" :key="d.value">{{d.label}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="刷号费：">
              <a-input-number
                placeholder="请输入刷号费"
                v-model="order.brush"
                :disabled="!recored.isEdit"
                @change="onChangeBrush"
                style="width: 220px;"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="流水：">
              <a-input-number
                placeholder="请输入流水"
                :disabled="!recored.isEdit"
                @change="onChangeTurnover"
                v-model="order.turnover"
                style="width: 220px;"
                type="text"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="净利润：">
              <a-input-number
                disabled
                v-model="order.finalProfit"
                style="width: 220px;"
                type="text"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="成本：">
              <a-input-number
                placeholder="请输入成本"
                :disabled="!recored.isEdit"
                @change="onChangeCost"
                v-model="order.cost"
                style="width: 220px;"
                type="text"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="利润点：">
              <a-input-number
                disabled
                v-model="order.profitPoint"
                style="width: 220px;"
                type="text"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="毛利润：">
              <a-input disabled v-model="order.profit" style="width: 220px;" type="text" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="排期时间：">
              <a-date-picker
                v-model="order.schedule"
                :disabled="!recored.isEdit"
                :format="dateFormat"
                @change="onChangeSchedule"
                style="width: 220px;"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="返点：">
              <a-input-number
                placeholder="请输入返点"
                :disabled="!recored.isEdit"
                @change="onChangeRebate"
                v-model="order.rebate"
                style="width: 220px;"
                type="text"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="是否出票：">
              <a-switch
                @change="onChangeIsIssue"
                v-model="order.isIssueZ"
                checkedChildren="是"
                :disabled="!recored.isEdit"
                unCheckedChildren="否"
                defaultChecked
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="销项税：">
              <a-input disabled v-model="order.outputTax" style="width: 220px;" type="text" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="是否含税：">
              <a-select
                placeholder="是否含税"
                @change="onChangeTaxType"
                v-model="order.taxType"
                :disabled="!recored.isEdit"
                style="width: 220px;"
              >
                <a-select-option value="6">专一</a-select-option>
                <a-select-option value="1">专三</a-select-option>
                <a-select-option value="2">专六</a-select-option>
                <a-select-option value="3">普票</a-select-option>
                <a-select-option value="5">无</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="进项税：">
              <a-input disabled v-model="order.taxation" style="width: 220px;" type="text" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注：">
              <a-textarea
                v-model="order.saleRemark"
                :disabled="!recored.isEdit"
                style="width: 220px;"
                placeholder="备注..."
                :autoSize="{  minRows: 3, maxRows: 6 }"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="20" :offset="4" style="margin-top: 12px;">
            <a-form-model-item>
              <a-button style="margin-right: 24px;" @click="handleCancel">取消</a-button>
              <a-button type="primary" @click="handleSubmit">确定</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-table
        v-if="recored.isEdit"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :scroll="{ x: 3000, y: 500 }"
      ></a-table>
      <br />
      <a-pagination
        showQuickJumper
        :total="total"
        :current="current"
        hideOnSinglePage
        @change="onChangePage"
      />
      <a-col v-if="recored.isEdit" :span="20" :offset="0" style="margin-top: 24px;">
        <a-button style="margin-right: 24px;" type="primary" @click="handleCancel">返回</a-button>
      </a-col>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import {
  customList,
  finAdminList,
  addOrderUpdate,
  orderByAccountList
} from '@/api/market'
import { orderDetail } from '@/api/channel'
import { updateOrderIndex } from '@/api/member'
import moment from 'moment'

interface ValueType {
  [key: string]: string | number
}

@Component
export default class Order extends Vue {
  @Prop() private recored!: any

  private accountInfo!: any
  private customs!: any[]
  private orderData!: any[]
  private orderDataFin!: any[]
  private value?: ValueType
  private order!: any
  private columns!: any
  private dataSource!: any
  private total!: number
  private current!: number
  private spinning!: boolean

  private data() {
    return {
      accountInfo: [],
      orderData: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          align: 'center',
          width: 80,
          fixed: 'left'
        },
        {
          title: '订单号',
          dataIndex: 'orderNum',
          width: 200,
          align: 'center'
        },
        {
          title: '公众号',
          dataIndex: 'accountName',
          width: 160,
          align: 'center'
        },
        {
          title: '回款客户',
          dataIndex: 'customName',
          width: 240,
          align: 'center'
        },
        {
          title: '修改时间',
          dataIndex: 'createTime',
          width: 200,
          align: 'center'
        },
        {
          title: '排期时间',
          dataIndex: 'schedule',
          width: 180,
          align: 'center'
        },
        {
          title: '流水',
          dataIndex: 'turnover',
          width: 120,
          align: 'center'
        },
        {
          title: '成本',
          dataIndex: 'cost',
          align: 'center'
        },
        {
          title: '毛利润',
          dataIndex: 'profit',
          align: 'center'
        },
        {
          title: '利润点',
          dataIndex: 'profitPoint',
          align: 'center'
        },
        {
          title: '销项税',
          dataIndex: 'outputTax',
          align: 'center'
        },
        {
          title: '进项税',
          dataIndex: 'taxation',
          align: 'center'
        },
        {
          title: '返点',
          dataIndex: 'rebate',
          align: 'center'
        },
        {
          title: '净利润',
          dataIndex: 'finalProfit',
          align: 'center'
        },
        {
          title: '所属渠道',
          dataIndex: 'channelName',
          align: 'center'
        },
        {
          title: '所属销售',
          dataIndex: 'saleName',
          align: 'center'
        },
        {
          title: '修改人员',
          dataIndex: 'operateName',
          width: 100,
          align: 'center',
          fixed: 'right'
        }
      ],
      orderDataFin: [],
      dataSource: [],
      value: undefined,
      dateFormat: 'YYYY-MM-DD',
      total: 0,
      current: 1,
      spinning: false,
      order: {
        accountName: '', // 公众号名字
        accountId: undefined, // 公众号ID
        finId: undefined, // 渠道ID
        customIdZ: undefined, // 汇款客户
        brush: undefined, // 刷号费
        turnover: undefined, // 流水
        finalProfit: 0, // 净利润
        cost: undefined, // 成本
        profitPoint: 0, // 利润点
        profit: 0, // 毛利润
        schedule: undefined, // 排期
        rebate: undefined, // 返点
        isIssueZ: undefined, // 是否出票 1 是  0 否
        outputTax: 0, // 销项税
        taxType: undefined, // 税款类型 1 专三  2 专六  3 普三 4 普六 5 不含税
        taxation: 0, // 进项税
        saleRemark: undefined // 备注
      }
    }
  }

  @Watch('recored', { immediate: true, deep: true })
  private watchForm(value: any) {
    if (!value.isEdit) {
      this.$nextTick(() => {
        orderDetail({ orderId: value.id }).then((res: any) => {
          if (res.code === 200) {
            Object.assign(this.order, res.order)
            console.log(this.order)
            const { order } = this
            if (order) {
              order.taxType =
                order.taxType === 1
                  ? '专三'
                  : order.taxType === 2
                  ? '专六'
                  : order.taxType === 3
                  ? '普票'
                  : order.taxType === 6
                  ? '专一'
                  : '无'
              order.customIdZ = {
                label: order.customName,
                value: order.customId
              }
              order.schedule = moment(order.schedule)
              this.order = order
            }
          }
        })
      })
    } else {
      const params = {
        pageNo: 0,
        orderId: value.id
      }
      this.getUpdateOrderIndex(params)
    }
  }

  private getUpdateOrderIndex(params: any) {
    this.spinning = true
    return updateOrderIndex(params)
      .then((res: any) => {
        if (res.code === 200) {
          const dataSource = res.page.result.map((item: any) => {
            return {
              ...item,
              key: item.id
            }
          })
          this.dataSource = [{ ...res.order, key: res.order.id }, ...dataSource]
        }
      })
      .finally(() => {
        this.spinning = false
      })
  }

  // 分页
  private onChangePage(pageNumber: number) {
    const params = {
      pageNo: +pageNumber - 1,
      orderId: this.recored.id
    }
    this.getUpdateOrderIndex(params)
  }

  private mounted() {
    customList({ customName: '' }).then((res: any) => {
      if (res.code === 200) {
        const data = res.customs.map((item: any) => ({
          label: item.customName,
          value: item.id
        }))
        this.orderData = data
      }
    })
  }

  // 搜索
  private fetchUser(value: string) {
    this.orderData = []
    customList({ customName: value }).then((res: any) => {
      if (res.code === 200) {
        const data = res.customs.map((item: any) => ({
          label: item.customName,
          value: item.id
        }))
        this.orderData = data
      }
    })
  }

  // 焦点
  private handleFocus() {
    this.orderData = []
    customList({
      customName: (this.order.customIdZ && this.order.customIdZ.label) || ''
    }).then((res: any) => {
      if (res.code === 200) {
        const data = res.customs.map((item: any) => ({
          label: item.customName,
          value: item.id
        }))
        this.orderData = data
      }
    })
  }

  // change
  private handleChange(value: string) {
    this.order.customIdZ = value
  }

  // 刷号费
  private onChangeBrush(value: string | number) {
    const { order } = this
    // 计算净利润
    order.finalProfit = (
      +order.profit -
      +order.outputTax -
      (+order.rebate || 0) +
      +order.taxation -
      (+order.brush || 0)
    ).toFixed(2)

    // 计算利润点
    order.profitPoint = (
      (+order.finalProfit || 0) / (+order.turnover || 1)
    ).toFixed(2)
    this.order = order
  }

  // 流水
  private onChangeTurnover(value: string | number) {
    const { order } = this
    // 计算毛利润
    order.profit = ((+order.turnover || 0) - (+order.cost || 0)).toFixed(2)

    // 计算销项税
    if (order.isIssueZ) {
      order.outputTax = (+order.turnover * 0.07).toFixed(2)
    } else {
      order.outputTax = 0
    }

    // 计算净利润
    order.finalProfit = (
      +order.profit -
      +order.outputTax -
      (+order.rebate || 0) +
      +order.taxation -
      (+order.brush || 0)
    ).toFixed(2)

    // 计算利润点
    order.profitPoint = (
      (+order.finalProfit || 0) / (+order.turnover || 1)
    ).toFixed(2)

    this.order = order
  }

  // 成本
  private onChangeCost(value: string | number) {
    const { order } = this
    // 计算毛利润
    order.profit = ((+order.turnover || 0) - (+order.cost || 0)).toFixed(2)

    // 计算进项税
    if (order.taxType === '5' || order.taxType === '3') {
      order.taxation = 0
    }

    if (order.taxType === '1') {
      order.taxation = (+order.cost * 0.03).toFixed(2)
    }

    if (order.taxType === '2') {
      order.taxation = (+order.cost * 0.06).toFixed(2)
    }

    if (order.taxType === '6') {
      order.taxation = (+order.cost * 0.01).toFixed(2)
    }

    // 计算净利润
    order.finalProfit = (
      +order.profit -
      +order.outputTax -
      (+order.rebate || 0) +
      +order.taxation -
      (+order.brush || 0)
    ).toFixed(2)

    // 计算利润点
    order.profitPoint = (
      (+order.finalProfit || 0) / (+order.turnover || 1)
    ).toFixed(2)

    this.order = order
  }

  // 返点
  private onChangeRebate(value: string | number) {
    const { order } = this
    // 计算净利润
    order.finalProfit = (
      +order.profit -
      +order.outputTax -
      (+order.rebate || 0) +
      +order.taxation -
      (+order.brush || 0)
    ).toFixed(2)

    // 计算利润点
    order.profitPoint = (
      (+order.finalProfit || 0) / (+order.turnover || 1)
    ).toFixed(2)

    this.order = order
  }

  // 是否出票
  private onChangeIsIssue(checked: boolean, event: Event) {
    const { order } = this
    // 计算销项税
    if (checked) {
      order.outputTax = ((+order.turnover || 0) * 0.07).toFixed(2)
    } else {
      order.outputTax = 0
    }

    // 计算净利润
    order.finalProfit = (
      +order.profit -
      +order.outputTax -
      (+order.rebate || 0) +
      +order.taxation -
      (+order.brush || 0)
    ).toFixed(2)

    // 计算利润点
    order.profitPoint = (
      (+order.finalProfit || 0) / (+order.turnover || 1)
    ).toFixed(2)

    this.order = order
  }

  // 是否含说
  private onChangeTaxType(value: string) {
    const { order } = this

    // 计算进项税
    if (value === '5' || value === '3') {
      order.taxation = 0
    }

    if (value === '1') {
      order.taxation = ((+order.cost || 0) * 0.03).toFixed(2)
    }

    if (value === '2') {
      order.taxation = ((+order.cost || 0) * 0.06).toFixed(2)
    }

    if (value === '6') {
      order.taxation = ((+order.cost || 0) * 0.01).toFixed(2)
    }

    // 计算净利润
    order.finalProfit = (
      +order.profit -
      +order.outputTax -
      (+order.rebate || 0) +
      +order.taxation -
      (+order.brush || 0)
    ).toFixed(2)

    // 计算利润点
    order.profitPoint = (
      (+order.finalProfit || 0) / (+order.turnover || 1)
    ).toFixed(2)

    this.order = order
  }

  // 排期时间
  private onChangeSchedule(date: any, dateString: string) {
    const { order } = this
    order.schedule = moment(dateString)
    this.order = order
    console.log(dateString)
  }

  // 提交
  private handleSubmit() {
    const { order } = this
    order.accountName = this.recored.accountName // 公众号名字
    order.accountId = this.recored.id // 公众号ID
    order.finId = this.recored.finId // 渠道ID
    order.isIssue = order.isIssueZ ? 1 : 0
    order.customId = order.customIdZ
      ? order.customIdZ.key || order.customIdZ.value
      : ''
    order.schedule = moment(order.schedule).format('YYYY-MM-DD')
    order.taxType =
      order.taxType === '专三'
        ? 1
        : order.taxType === '专六'
        ? 2
        : order.taxType === '普票'
        ? 3
        : order.taxType === '专一'
        ? 6
        : 5
    console.log(order)

    addOrderUpdate(order)
      .then((res: any) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.onClose(false)
        } else {
          this.$message.error(res.message)
          this.onClose(true)
        }
      })
      .finally(() => {
        order.schedule = moment(order.schedule)
        this.order = order
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
}
</style>
