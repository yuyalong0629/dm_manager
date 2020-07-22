<template>
  <div class="customer-accounts">
    <a-spin :spinning="spinning">
      <a-form-model layout="inline" ref="ruleForm" :model="form" :rules="rules" labelAlign="left">
        <a-row>
          <a-col :span="20">
            <a-row type="flex" justify="space-between">
              <a-col :span="6">
                <a-form-model-item label="类别分类" prop="accountTypeId">
                  <a-select style="width: 160px" v-model="form.accountTypeId" placeholder="请选择类别">
                    <a-select-option v-for="item of accountTypes" :key="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item label="地区" prop="areaId">
                  <a-select style="width: 163px" v-model="form.areaId" placeholder="请选择地区">
                    <a-select-option v-for="item of areas" :key="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>

              <a-col :span="6">
                <a-form-model-item label="渠道" prop="accountType">
                  <a-select style="width: 160px" v-model="form.finId" placeholder="请选择渠道">
                    <a-select-option v-for="item of admins" :key="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>

              <a-col :span="6"></a-col>

              <a-col :span="12">
                <a-form-model-item label="价格区间" prop="priceMin">
                  <a-input style="width: 160px" v-model="form.priceMin" />
                </a-form-model-item>
                <a-form-model-item prop="priceMax">~</a-form-model-item>
                <a-form-model-item prop="priceMax">
                  <a-input style="width: 160px" v-model="form.priceMax" />
                </a-form-model-item>
                <a-form-model-item prop="sortPriceType">
                  <a-select style="width: 130px" v-model="form.sortByPrice" placeholder="选择排序">
                    <a-select-option value="a">从小到大</a-select-option>
                    <a-select-option value="b">从大到小</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>

              <a-col :span="12">
                <a-form-model-item label="粉丝区间" prop="fansMin">
                  <a-input style="width: 160px" v-model="form.fansMin" />
                </a-form-model-item>
                <a-form-model-item prop="priceMax">~</a-form-model-item>
                <a-form-model-item prop="fansMax">
                  <a-input style="width: 160px" v-model="form.fansMax" />
                </a-form-model-item>
                <a-form-model-item prop="sortType">
                  <a-select style="width: 130px" v-model="form.sortByFans" placeholder="选择排序">
                    <a-select-option value="a">从小到大</a-select-option>
                    <a-select-option value="b">从大到小</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="4">
            <a-form-model-item>
              <a-button
                :style="{width: '80px', marginRight: '12px'}"
                type="primary"
                @click="onSubmit"
              >查询</a-button>
              <a-button style="width: 80px" @click="onReset">重置</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-divider />

      <div class="customer-accounts-edit">
        <a-button type="primary" @click="handleOrder(recored, edit = '1')">添加</a-button>
        <a-input-search @search="onSearch" placeholder="精准搜索..." style="width: 280px" />
      </div>

      <!-- Table -->
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :scroll="{ x: 2600, y: 500 }"
      >
        <span slot="isMeipai" slot-scope="text">{{ text === 0 ? '否' : '是' }}</span>
        <span slot="edit" slot-scope="text, recored">
          <a-tooltip placement="left" title="编辑">
            <a-tag
              @click="handleOrder(recored, edit = '2')"
              color="#87d068"
              :style="{ 'font-size': '16px', cursor: 'pointer' }"
            >
              <a-icon type="edit" />
            </a-tag>
          </a-tooltip>
          <!-- <a-tooltip placement="right" title="删除">
            <a-tag
              color="#DA5054"
              @click="handleOrder(recored, edit = '3')"
              :style="{
                    'font-size': '16px',
                    'margin-right': '8px',
                    cursor: 'pointer'
                  }"
            >
              <a-icon type="delete" />
            </a-tag>
          </a-tooltip>-->
        </span>
        <span slot="accountType" slot-scope="text">{{ text === 1 ? '营销号' : '自媒体' }}</span>
        <span slot="accountState" slot-scope="text">{{ text === 3 ? 'B站' : '' }}</span>
      </a-table>
      <br />
      <a-pagination
        showQuickJumper
        :total="total"
        :current="current"
        :defaultPageSize="20"
        hideOnSinglePage
        @change="onChangePage"
      />
    </a-spin>

    <!-- Drawer -->
    <a-drawer
      :title="title"
      placement="right"
      destroyOnClose
      :maskClosable="false"
      width="45%"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <Order
        :accountTypes="accountTypes"
        :areas="areas"
        :admins="admins"
        :recored="recored"
        @onClose="onClose"
      />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CustomerIndexType } from '@/types/api'
import { customerIndex, customerType, accountExcel } from '@/api/market'
import columns from './columns'
import Order from './Order.vue'

@Component({
  components: {
    Order
  }
})
export default class CustomerAccounts extends Vue {
  private spinning!: boolean
  private dataSource!: any[]
  private total!: number
  private current!: number
  private selectedRowKeys!: string
  private form!: CustomerIndexType
  private areas!: any
  private accountTypes!: any
  private admins!: any
  private visible!: boolean
  private recored!: any
  private title!: string

  private data() {
    return {
      spinning: false,
      form: {
        accountTypeId: undefined, // 分类id
        areaId: undefined, // 地区id
        accountType: undefined, // 公众号属性
        accountState: 8, // 公众号分类
        priceMin: undefined, // 最低价格
        priceMax: undefined, // 最大价格
        sortByPrice: undefined, // 价格升降序  a:表示价格升序；b:表示价格降序
        fansMin: undefined, // 最小粉丝数
        fansMax: undefined, // 最大粉丝数
        sortByFans: undefined, // 粉丝升降序  a:表示粉丝升序；b:表示粉丝降序
        accountName: '', // 搜索
        isAccountState: '2', //
        finId: undefined, // 渠道
        pageNo: 0
      },
      rules: {},
      columns,
      dataSource: [],
      selectedRowKeys: '',
      areas: [],
      accountTypes: [],
      admins: [],
      total: 100,
      current: 1,
      visible: false,
      recored: {},
      title: '生成订单'
    }
  }

  private mounted() {
    // 获取分类列表
    customerType().then((res: any) => {
      if (res.code === 200) {
        this.areas = res.areas.map((item: any) => {
          return {
            label: item.areaName,
            value: item.id
          }
        })
        this.accountTypes = res.accountTypes.map((item: any) => {
          return {
            label: item.typeName,
            value: item.id
          }
        })
        const admins = res.admins.map((item: any) => {
          return {
            label: item.realName,
            value: item.id
          }
        })
        this.admins = [{ label: '全部', value: '' }, ...admins]
      }
    })

    const { form } = this
    this.getCustomerIndex(form)
  }

  private getCustomerIndex(params: any) {
    this.spinning = true
    return customerIndex(params)
      .then((res: any) => {
        if (res.code === 200) {
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

  // 查询
  private onSubmit() {
    ;(this.$refs.ruleForm as any).validate((valid: any) => {
      if (valid) {
        const { form } = this
        form.pageNo = 0
        this.getCustomerIndex(form)
        this.form = form
        this.$router.replace({
          query: {
            pageNo: '1'
          }
        })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  // 重置
  private onReset() {
    ;(this.$refs.ruleForm as any).resetFields()
    const { form } = this
    form.pageNo = 0
    this.getCustomerIndex(form)
    this.form = form
    this.$router.replace({
      query: {
        pageNo: '1'
      }
    })
  }

  // 搜索
  private onSearch(value: string) {
    const { form } = this
    form.pageNo = 0
    form.accountName = value
    this.getCustomerIndex(form)
    this.form = form
    this.$router.replace({
      query: {
        pageNo: '1'
      }
    })
  }

  // 分页
  private onChangePage(pageNumber: number) {
    const { form } = this
    form.pageNo = +pageNumber - 1
    this.getCustomerIndex(form)
    this.form = form
    this.$router.replace({
      query: {
        pageNo: pageNumber + ''
      }
    })
  }

  // 生成订单
  private handleOrder(recored: any, edit: string) {
    this.visible = true
    if (edit === '1') {
      this.recored = { edit: '1' }
      this.title = '添加公众号'
    }
    if (edit === '2') {
      this.recored = { ...recored, edit: '2' }
      this.title = '修改公众号'
    }
  }

  // 关闭抽屉
  private onClose(isClose: boolean) {
    new Promise((resolve, reject) => {
      this.visible = isClose
      resolve()
    }).then(() => {
      const { form } = this
      this.getCustomerIndex(form)
      this.form = form
    })
  }
}
</script>

<style lang="less" scoped>
.customer-accounts {
  /deep/ .ant-form-item-label {
    width: 84px;
  }

  .customer-accounts-edit {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
}
</style>
