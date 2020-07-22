<template>
  <div class="channel-order">
    <a-spin :spinning="spinning">
      <a-form-model layout="inline" ref="ruleForm" :model="form" :rules="rules" labelAlign="left">
        <a-row>
          <a-col :span="5">
            <a-form-model-item label="订单号" prop="orderNum">
              <a-input style="width: 240px" v-model="form.orderNum" placeholder="请输入订单号" />
            </a-form-model-item>
          </a-col>

          <a-col :span="7">
            <a-form-model-item label="订单日期" prop="orderStartTime">
              <a-range-picker @change="onChangeorderTime" />
            </a-form-model-item>
          </a-col>

          <a-col :span="5">
            <a-form-model-item label="所属销售" prop="saleId">
              <a-select style="width: 180px" v-model="form.saleId" placeholder="请选择所属销售">
                <a-select-option v-for="item of lists" :key="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="5">
            <a-form-model-item label="修改状态" prop="isUpdate">
              <a-select style="width: 180px" v-model="form.isUpdate" placeholder="请选择修改状态">
                <a-select-option v-for="item of stateList" :key="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="5">
            <a-form-model-item label="公众号" prop="accountName">
              <a-input style="width: 240px" v-model="form.accountName" placeholder="请输入公众号" />
            </a-form-model-item>
          </a-col>

          <a-col :span="7">
            <a-form-model-item label="排期日期" prop="scheduleStartTime">
              <a-range-picker @change="onChangeScheduleTime" />
            </a-form-model-item>
          </a-col>

          <a-col :span="5">
            <a-form-model-item label="所属渠道" prop="finId">
              <a-select style="width: 180px" v-model="form.finId" placeholder="请选择所属渠道">
                <a-select-option v-for="item of saListlists" :key="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="6">
            <a-form-model-item label>
              <a-button
                :style="{width: '80px', marginRight: '12px'}"
                @click="onSubmit"
                type="primary"
              >查询</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-divider orientation="left">订单信息列表</a-divider>
      <a-descriptions size="small" :column="8">
        <a-descriptions-item label="总流水">
          <a>{{ turnovers }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="总成本">
          <a>{{ costs }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="总毛利润">
          <a>{{ profits }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="总销项税">
          <a>{{ outputTaxs }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="总返点">
          <a>{{ rebates }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="总净利润">
          <a>{{ finalProfits }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="总利润点">
          <a>{{ profitPoints }}</a>
        </a-descriptions-item>
      </a-descriptions>
      <div class="channel-order-date">
        <a-button type="primary" @click="handleImport">导出</a-button>

        <span>
          <a-switch
            :checked="isLock"
            checked-children="锁定"
            un-checked-children="取消"
            @change="onChangeSwitch"
          />
          <a-button :style="{marginLeft: '12px'}" type="primary" @click="handleYesterday">查看昨日</a-button>
          <a-button style="margin: 0 12px;" type="primary" @click="handleMonthOrder">当月订单</a-button>
          <a-button type="primary" @click="handleMonthSchedule">当月排期</a-button>
        </span>
      </div>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
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
import { channelOrder, adminFinList, orderExport } from '@/api/channel'
import { updateReturnedMoney, isLock } from '@/api/member'
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
  private isLock!: boolean

  private data() {
    return {
      spinning: false,
      isLock: false,
      form: {
        pageNo: 0, // 页数
        orderNum: undefined, // 订单号
        saleId: undefined, // 销售id
        finId: undefined, // 渠道id
        accountName: undefined, //  公众号名称
        orderStartTime: undefined, //  订单起始时间
        orderEndTime: undefined, //  订单截止时间
        scheduleStartTime: undefined, //  排期起始时间
        scheduleEndTime: undefined, //  排期截止时间
        orderState: 'a', //  排期截止时间
        isUpdate: undefined
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
          title: '回款时间',
          dataIndex: 'orderPayTime',
          width: 240,
          scopedSlots: { customRender: 'orderPayTime' },
          align: 'center'
        },
        {
          title: '已回款',
          dataIndex: 'returnedMoney',
          width: 200,
          scopedSlots: { customRender: 'returnedMoney' },
          align: 'center'
        },
        {
          title: '待回款',
          dataIndex: 'returningMoney',
          scopedSlots: { customRender: 'returningMoney' },
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

  // 锁定
  onChangeSwitch(checked: boolean, event: Event) {
    const params = {
      islock: checked ? 1 : 0
    }
    isLock(params).then((res: any) => {
      if (res.code === 200) {
        this.isLock = checked
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    })
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

          this.isLock = res.isLock || false
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
    const { form } = this
    console.log(form)
    if (form.scheduleEndTime && form.scheduleStartTime) {
      orderExport(form).then((res: any) => {
        const blob = new Blob([res], {
          type: 'application/vnd.ms-excel;charset=utf-8'
        })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `销售订单${new Date().getTime()}`
        link.click()
      })
    } else {
      this.$message.error('请选择导出排期时间！')
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
