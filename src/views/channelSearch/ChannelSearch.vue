<template>
  <div class="channel-search">
    <a-input-search @search="onSearch" placeholder="精准搜索..." style="width: 320px" />
    <br />
    <br />
    <a-spin :spinning="spinning">
      <a-table :columns="columns" :scroll="{ y: 560 }" :dataSource="dataSource" :pagination="false">
        <span
          slot="accountState"
          slot-scope="text"
        >{{ accountStateList[text - 1] && accountStateList[text - 1].value }}</span>
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
import { customerIndex } from '@/api/market'

@Component
export default class ChannelSearch extends Vue {
  private spinning!: boolean
  private total!: number
  private current!: number
  private accountName!: string
  private dataSource!: any
  private accountStateList!: any

  private data() {
    return {
      spinning: false,
      total: 10,
      current: 1,
      columns: [
        {
          title: '账号名',
          dataIndex: 'accountName',
          align: 'center'
        },
        {
          title: '账号ID',
          dataIndex: 'accountId',
          align: 'center'
        },
        {
          title: '账号分类',
          dataIndex: 'accountState',
          scopedSlots: { customRender: 'accountState' },
          align: 'center'
        },
        {
          title: '所属运营渠道',
          dataIndex: 'adminName',
          align: 'center'
        }
      ],
      dataSource: [],
      accountName: '', // 搜索
      accountStateList: [
        { id: 1, value: '订阅号' },
        { id: 2, value: '服务号' },
        { id: 3, value: 'B站' },
        { id: 4, value: '微博号' },
        { id: 5, value: '小红书' },
        { id: 6, value: '抖音号' },
        { id: 7, value: '快手号' },
        { id: 8, value: '美拍号' },
        { id: 9, value: '直播号' }
      ]
    }
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

          this.total = +res.page.count
          this.current = +res.page.index + 1
        }
      })
      .finally(() => {
        this.spinning = false
      })
  }

  // 搜索
  private onSearch(value: string) {
    this.getCustomerIndex({ accountName: value, pageNo: 0 })
    this.accountName = value
  }

  // 分页
  private onChangePage(pageNumber: number) {
    this.getCustomerIndex({
      accountName: this.accountName,
      pageNo: +pageNumber - 1
    })
  }
}
</script>

<style lang="less" scoped>
</style>
