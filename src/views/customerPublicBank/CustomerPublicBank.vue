<template>
  <div class="customer-publicBank">
    <a-spin :spinning="spinning">
      <div class="customer-header">
        <a-input-search placeholder="搜索客户名称" style="width: 300px" @search="onSearch" />
      </div>
      <a-divider />
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false"></a-table>
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
import columns from './columns'
import { publicIndex } from '@/api/market'

@Component
export default class PublicBank extends Vue {
  private spinning!: boolean
  private dataSource!: any[]
  private total!: number
  private current!: number
  private params!: any

  private data() {
    return {
      spinning: false,
      columns,
      dataSource: [],
      total: 100,
      current: 1,
      params: {
        num: 0,
        customName: ''
      }
    }
  }

  private mounted() {
    const { params } = this
    this.getCustomInfoTab(params)
  }

  // 获取Tab信息
  private getCustomInfoTab(params: any) {
    this.spinning = true
    return publicIndex(params)
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
        } else {
          this.$message.error(res.message)
        }
      })
      .finally(() => {
        this.spinning = false
      })
  }

  // 搜索
  private onSearch(value: string) {
    const { params } = this
    params.customName = value
    params.pageNo = 0
    this.getCustomInfoTab(params)
    this.$router.replace({
      query: {
        pageNo: '1'
      }
    })
    this.params = params
  }

  // 分页
  private onChangePage(pageNumber: number) {
    const { params } = this
    params.pageNo = +pageNumber - 1
    this.params = params
    this.getCustomInfoTab(params)

    this.$router.replace({
      query: {
        pageNo: pageNumber + ''
      }
    })
  }
}
</script>

<style lang="less" scoped>
</style>
