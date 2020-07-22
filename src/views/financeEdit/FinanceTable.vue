<template>
  <div class="channel-order">
    <a-spin :spinning="spinning">
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :rowSelection="rowSelection"
        :pagination="false"
        :scroll="{ x: 3000, y: 500 }"
      >
        <div slot="orderPayTime" slot-scope="text, record">
          <a-date-picker
            v-if="record.editableDate"
            :value="moment(text)"
            style="width: 160px;"
            @change="(date, dateString)=> handleChangeDate(date, dateString, record.key)"
          />
          <span style="display: inline-block; width: 100px;" v-else>{{text}}</span>
          <span v-if="record.editableDate" style="margin: 0 5px;">
            <a @click="() => saveDate(record)">保存</a>
          </span>
          <span v-else style="margin: 0 5px; width: 100px;">
            <a @click="() => editDate(record)">修改</a>
          </span>
        </div>
        <div slot="returnedMoney" slot-scope="text, record">
          <a-input-number
            v-if="record.editable"
            style="width: 80px;"
            :value="text"
            @change="value=> handleChangeReturn(value, record.key)"
          />
          <span style="display: inline-block; width: 100px;" v-else>{{text}}</span>
          <span v-if="record.editable" style="margin: 0 5px;">
            <a @click="() => saveReturn(record)">保存</a>
          </span>
          <span v-else style="margin: 0 5px; width: 100px;">
            <a @click="() => editReturn(record.key)">修改</a>
          </span>
        </div>
        <span
          slot="taxType"
          slot-scope="text"
        >{{ text === 1 ? '专三' : text === 2 ? '专六' : text === 3 ? '普票' : '不含税' }}</span>
        <span slot="edit" slot-scope="text, recored">
          <a-tooltip placement="left" title="查看">
            <a-tag
              @click="handleOrder(recored, false)"
              color="#00a0e9"
              :style="{ 'font-size': '16px', cursor: 'pointer' }"
            >
              <a-icon type="search" />
            </a-tag>
          </a-tooltip>
          <a-tooltip v-if="recored.isUpdate === 1" placement="top" title="查看编辑">
            <a-tag
              color="#87d068"
              @click="handleOrder(recored, true)"
              :style="{
                    'font-size': '16px',
                    'margin-right': '8px',
                    cursor: 'pointer'
                  }"
            >
              <a-icon type="edit" />
            </a-tag>
          </a-tooltip>
        </span>
      </a-table>
      <br />
      <a-pagination
        showQuickJumper
        :total="total"
        :defaultPageSize="10"
        :current="current"
        hideOnSinglePage
        @change="onChangePage"
      />
    </a-spin>

    <a-drawer
      :title="title"
      placement="right"
      destroyOnClose
      :maskClosable="false"
      width="60%"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <Order :recored="recored" @onClose="onClose" />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { channelOrder, adminFinList, orderExcel } from '@/api/channel'
import { updateReturnedMoney } from '@/api/member'
import Order from './Order.vue'
import moment from 'moment'

@Component({
  components: {
    Order
  }
})
export default class ChannelOrder extends Vue {
  private spinning!: boolean
  private form!: any
  private total!: number
  private current!: number
  private lists!: any
  private saListlists!: any
  private columns!: any
  private dataSource!: any
  private visible!: boolean
  private recored!: any
  private title!: string
  private costs!: string
  private turnovers!: string
  private profits!: string
  private finalProfits!: string
  private rebates!: string
  private outputTaxs!: string
  private profitPoints!: string
  private selectedRowKeys!: string

  private data() {
    return {
      spinning: false,
      form: {
        pageNo: 0, // 页数
        isUpdate: 1
      },
      selectedRowKeys: '',
      moment,
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
          title: '订单时间',
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
          title: '备注',
          dataIndex: 'saleRemark',
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center',
          fixed: 'right'
        }
      ],
      rules: {},
      dataSource: [],
      total: 1,
      current: 1,
      lists: [],
      saListlists: [],
      stateList: [
        { label: '全部', value: '' },
        { label: '已修改', value: 1 },
        { label: '未修改', value: 0 }
      ],
      visible: false,
      recored: null,
      title: '查看详情',
      costs: undefined,
      turnovers: undefined,
      profits: undefined,
      finalProfits: undefined,
      rebates: undefined,
      outputTaxs: undefined,
      profitPoints: undefined
    }
  }

  private mounted() {
    // 获取渠道 / 销售
    adminFinList({ duty: 1 }).then((res: any) => {
      if (res.code === 200) {
        if (res.lists) {
          this.lists = res.lists.map((item: any) => {
            return {
              label: item.realName,
              value: item.id
            }
          })
          this.saListlists = res.saListlists.map((item: any) => {
            return {
              label: item.realName,
              value: item.id
            }
          })
        }
      }
    })

    const { form } = this
    this.getChannelOrder(form)
    this.form = form
  }

  // 订单日期
  private onChangeorderTime(date: any, dateString: string[]) {
    const { form } = this
    if (form) {
      form.orderStartTime = dateString[0]
      form.orderEndTime = dateString[1]

      this.form = form
    }
  }

  // 排期日期
  private onChangeScheduleTime(date: any, dateString: string[]) {
    const { form } = this
    if (form) {
      form.scheduleStartTime = dateString[0]
      form.scheduleEndTime = dateString[1]

      this.form = form
    }
  }

  // 查看昨日
  private handleYesterday() {
    const { form } = this
    if (form) {
      form.orderStartTime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
      form.orderEndTime = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')

      form.scheduleStartTime = undefined
      form.scheduleEndTime = undefined
      form.saleId = undefined

      form.pageNo = 0
      this.getChannelOrder(form)
      this.form = form
    }
  }

  // 查看当月订单
  private handleMonthOrder() {
    const { form } = this
    if (form) {
      form.orderStartTime = moment()
        .startOf('month')
        .format('YYYY-MM-DD')
      form.orderEndTime = moment()
        .endOf('month')
        .format('YYYY-MM-DD')

      form.scheduleStartTime = undefined
      form.scheduleEndTime = undefined
      form.saleId = undefined

      form.pageNo = 0
      this.getChannelOrder(form)
      this.form = form
    }
  }

  // 查看当月排期
  private handleMonthSchedule() {
    const { form } = this
    if (form) {
      form.scheduleStartTime = moment()
        .startOf('month')
        .format('YYYY-MM-DD')
      form.scheduleEndTime = moment()
        .endOf('month')
        .format('YYYY-MM-DD')

      form.orderStartTime = undefined
      form.orderEndTime = undefined
      form.saleId = undefined

      form.pageNo = 0
      this.getChannelOrder(form)

      this.form = form
    }
  }

  // 关闭抽屉
  private onClose(isClose: boolean) {
    new Promise((resolve, reject) => {
      this.visible = isClose
      resolve()
    }).then(() => {
      const { form } = this
      this.getChannelOrder(form)
      this.form = form
    })
  }

  // 查询
  private onSubmit() {
    console.log(this.form.scheduleStartTime)
    ;(this.$refs.ruleForm as any).validate((valid: any) => {
      if (valid) {
        const { form } = this
        form.pageNo = 0
        this.getChannelOrder(form)
        this.form = form
        this.$router
          .replace({
            query: {
              pageNo: '1'
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  // 订单查询
  private getChannelOrder(params: any) {
    this.spinning = true
    return channelOrder(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.spinning = false
          this.costs = res.costs
          this.turnovers = res.turnovers
          this.profits = res.profits
          this.finalProfits = res.finalProfits
          this.rebates = res.rebates
          this.outputTaxs = res.outputTaxs
          this.profitPoints = res.profitPoints
          this.dataSource = res.page.result.map((item: any) => {
            return {
              ...item,
              key: item.id
            }
          })

          this.total = res.page.count
          this.current = res.page.index + 1
        }
      })
      .finally(() => {
        this.spinning = false
      })
  }

  // 查看订单
  private handleOrder(recored: any, isEdit: boolean) {
    this.visible = true
    if (isEdit) {
      this.recored = { ...recored, isEdit: true }
      this.title = '查看修改'
    } else {
      this.recored = { ...recored, isEdit: false }
      this.title = '查看详情'
    }
  }

  // 导出
  private handleImport() {
    if (this.selectedRowKeys) {
      orderExcel({
        orderIds: this.selectedRowKeys
      }).then((res: any) => {
        const blob = new Blob([res], {
          type: 'application/vnd.ms-excel;charset=utf-8'
        })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `销售订单 + ${new Date().getTime()}`
        link.click()
      })
    }
  }

  // 选中
  private onSelectChange(selectedRowKeys: any, selectedRows: any) {
    this.selectedRowKeys = `${selectedRowKeys}`
  }

  private get rowSelection() {
    const { selectedRowKeys } = this
    return {
      onChange: this.onSelectChange
    }
  }

  // 修改Table日期
  private handleChangeDate(date: any, dateString: string, key: number) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => key === item.key
    )[0]
    if (target) {
      target.orderPayTime = dateString
      this.dataSource = dataSource
    }
  }

  private saveDate(record: any) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => record.key === item.key
    )[0]
    if (target) {
      updateReturnedMoney({
        orderId: record.key,
        orderPayTime: target.orderPayTime,
        returnedMoney: target.returnedMoney,
        returningMoney: target.returningMoney
      }).then((res: any) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          target.editableDate = false
          this.dataSource = dataSource
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }

  private editDate(record: any) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => record.key === item.key
    )[0]
    if (target) {
      target.editableDate = true
      this.dataSource = dataSource
      console.log(target)
    }
  }

  // 修改Table 回款
  private handleChangeReturn(value: string, key: number) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => key === item.key
    )[0]
    if (target) {
      target.returnedMoney = value
      target.returningMoney = target.turnover - target.returnedMoney
      this.dataSource = dataSource
    }
  }

  private saveReturn(record: any) {
    console.log(record)
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => record.key === item.key
    )[0]
    if (target) {
      updateReturnedMoney({
        orderId: record.key,
        orderPayTime: target.orderPayTime,
        returnedMoney: target.returnedMoney,
        returningMoney: target.returningMoney
      }).then((res: any) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          target.editable = false
          this.dataSource = dataSource
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }

  private editReturn(key: number) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => key === item.key
    )[0]
    if (target) {
      target.editable = true
      this.dataSource = dataSource
      console.log(target)
    }
  }

  // 分页
  private onChangePage(pageNumber: number) {
    const { form } = this
    form.pageNo = +pageNumber - 1
    this.getChannelOrder(form)
    this.form = form
    this.$router
      .push({
        query: {
          pageNo: pageNumber + ''
        }
      })
      .catch(err => {
        console.log('输出报错', err)
      })
  }
}
</script>

<style lang="less" scoped>
.channel-order {
  /deep/ .ant-form-item-label {
    width: 84px;
  }

  .channel-order-date {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
  }
}
</style>
