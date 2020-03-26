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
                <a-select-option v-for="item of saListlists" :key="item.value">{{ item.label }}</a-select-option>
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

          <!-- <a-col :span="5" v-if="isSelect">
            <a-form-model-item label="所属渠道" prop="finId">
              <a-select style="width: 180px" v-model="form.finId" placeholder="请选择所属销售">
                <a-select-option v-for="item of lists" :key="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>-->

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
      <a-divider orientation="left">
        总渠道成本：
        <a href="javascript:;">{{costs}}</a>
      </a-divider>
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
        <span
          slot="taxType"
          slot-scope="text"
        >{{ text === 1 ? '专三' : text === 2 ? '专六' : text === 3 ? '普票' : '不含税' }}</span>
        <span slot="edit" slot-scope="text, recored">
          <a-tooltip
            v-if="recored.orderStatus === 0 && (JSON.parse($ls.get('USER_INFO')).id) !== recored.operateAdminId"
            placement="top"
            title="审核"
          >
            <a-tag
              @click="handleCheck(recored)"
              color="#87d068"
              :style="{ 'font-size': '16px', cursor: 'pointer' }"
            >
              <a-icon type="check" />
            </a-tag>
          </a-tooltip>
          <a-tooltip v-if="recored.status === 0" placement="top" title="删除">
            <a-tag
              @click="handleDelete(recored)"
              color="#f50"
              :style="{ 'font-size': '16px', cursor: 'pointer' }"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { channelOrder, adminFinList, confirmOrder } from '@/api/channel'
import moment from 'moment'

@Component
export default class ChannelOrder extends Vue {
  private spinning!: boolean
  private form!: any
  private total!: number
  private current!: number
  private saListlists!: any
  private lists!: any
  private columns!: any
  private dataSource!: any
  private costs!: string
  private isSelect!: boolean

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
        orderState: 'b' //  排期截止时间
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
          title: '订单成本',
          dataIndex: 'cost',
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
          title: '定金',
          dataIndex: 'payment',
          align: 'center'
        },
        {
          title: '税款类型',
          dataIndex: 'taxType',
          scopedSlots: { customRender: 'taxType' },
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
          title: '所属客户',
          dataIndex: 'customName',
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
      saListlists: [],
      lists: [],
      costs: '0',
      isSelect: false
    }
  }

  private mounted() {
    // 获取渠道 / 销售
    adminFinList({ duty: 2 }).then((res: any) => {
      if (res.code === 200) {
        this.saListlists = res.saListlists.map((item: any) => {
          return {
            label: item.realName,
            value: item.id
          }
        })

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
      this.isSelect = true
      return
    }
    // 主管
    if (USER_INFO.isManager === 2) {
      form.finId = USER_INFO.id
      this.getChannelOrder(form)
      this.isSelect = true
      this.form = form
      return
    }
    // 普通
    form.finId = USER_INFO.id
    this.getChannelOrder(form)
    this.isSelect = false
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

  // 审核
  private handleCheck(recored: any) {
    const params = {
      orderId: recored.id,
      operate: 1,
      operateState: 1
    }
    confirmOrder(params).then((res: any) => {
      if (res.code === 200) {
        this.$message.success(res.message)
        const { form } = this
        this.getChannelOrder(form)
      } else {
        this.$message.error(res.message)
      }
    })
  }

  // 删除
  private handleDelete(recored: any) {
    const params = {
      orderId: recored.id,
      operate: 2,
      operateState: 1
    }
    confirmOrder(params).then((res: any) => {
      if (res.code === 200) {
        this.$message.success(res.message)
        const { form } = this
        this.getChannelOrder(form)
      } else {
        this.$message.error(res.message)
      }
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
