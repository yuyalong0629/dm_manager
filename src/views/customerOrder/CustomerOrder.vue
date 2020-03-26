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
            <a-form-model-item v-if="isBtn" label="所属销售" prop="saleId">
              <a-select style="width: 180px" v-model="form.saleId" placeholder="请选择所属销售">
                <a-select-option v-for="item of lists" :key="item.value">{{ item.label }}</a-select-option>
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
      <a-descriptions size="small" :column="12">
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
      <div class="channel-order-date" v-if="isBtn">
        <a-button type="primary" @click="handleYesterday">查看昨日</a-button>
        <a-button style="margin: 0 12px;" type="primary" @click="handleMonthOrder">当月订单</a-button>
        <a-button type="primary" @click="handleMonthSchedule">当月排期</a-button>
      </div>
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
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
          <a-tooltip v-if="isSelect" placement="top" title="编辑">
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
          <a-tooltip placement="right" title="删除">
            <a-tag
              color="#f50"
              @click="handleDelete(recored)"
              :style="{
                    'font-size': '16px',
                    'margin-right': '8px',
                    cursor: 'pointer'
                  }"
            >
              <a-icon type="delete" />
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
      width="40%"
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
import { channelOrder, adminFinList } from '@/api/channel'
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
  private columns!: any
  private dataSource!: any
  private visible!: boolean
  private recored!: any
  private isSelect!: boolean
  private isBtn!: boolean
  private title!: string
  private costs!: string
  private turnovers!: string
  private profits!: string
  private finalProfits!: string
  private rebates!: string
  private outputTaxs!: string
  private profitPoints!: string

  private data() {
    return {
      spinning: false,
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
        orderState: 'a' //  排期截止时间
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          align: 'center'
        },
        {
          title: '订单号',
          dataIndex: 'orderNum',
          align: 'center'
        },
        {
          title: '公众号',
          dataIndex: 'accountName',
          align: 'center'
        },
        {
          title: '回款客户',
          dataIndex: 'customName',
          align: 'center'
        },
        {
          title: '订单时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '排期时间',
          dataIndex: 'schedule',
          align: 'center'
        },
        {
          title: '流水',
          dataIndex: 'turnover',
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
          title: '操作',
          dataIndex: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ],
      rules: {},
      dataSource: [],
      total: 0,
      current: 1,
      lists: [],
      visible: false,
      recored: null,
      isSelect: false,
      isBtn: false,
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
        }
      }
    })

    const { form } = this
    const USER_INFO = JSON.parse(this.$ls.get('USER_INFO'))
    // 超级管理员
    if (USER_INFO.isManager === 1) {
      this.getChannelOrder(form)
      this.isSelect = false
      this.isBtn = true
      return
    }
    // 主管
    if (USER_INFO.isManager === 2) {
      form.saleId = USER_INFO.id
      this.getChannelOrder(form)
      this.isSelect = false
      this.isBtn = true
      this.form = form
      return
    }
    // 普通
    form.saleId = USER_INFO.id
    this.getChannelOrder(form)
    this.isSelect = true
    this.isBtn = false
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
      this.title = '编辑详情'
    } else {
      this.recored = { ...recored, isEdit: false }
      this.title = '查看详情'
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
    justify-content: flex-end;
    padding-bottom: 12px;
  }
}
</style>
