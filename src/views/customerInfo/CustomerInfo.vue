<template>
  <div class="customer-info">
    <a-spin :spinning="spinning">
      <div class="customer-header">
        <span>
          <a-button
            v-if="isAddButton"
            type="primary"
            icon="plus-circle"
            :style="{marginRight: '12px'}"
            @click="handleAdd"
          >添加客户信息</a-button>
          <a-select
            v-if="isSelect"
            placeholder="请选择销售人员"
            style="width: 160px"
            @change="handleSelect"
          >
            <a-select-option v-for="item of lists" :key="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </span>
        <a-input-search placeholder="搜索客户名称" style="width: 300px" @search="onSearch" />
      </div>
      <a-divider />

      <div class="customer-info-edit">
        <a-button v-if="isImport" type="primary" @click="handleImport">导出</a-button>
        <a-button v-if="isAllot" type="primary" @click="handleAllot">分配客户</a-button>
      </div>

      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
      >
        <span slot="edit" slot-scope="text, record">
          <a-tooltip placement="left" title="编辑">
            <a-tag
              color="#87d068"
              @click="handleEdit(record)"
              :style="{
                    'font-size': '16px',
                    'margin-right': '8px',
                    cursor: 'pointer'
                  }"
            >
              <a-icon type="edit" />
            </a-tag>
          </a-tooltip>
          <a-tooltip placement="top" title="客户信息跟踪">
            <a-tag
              @click="handleFollow(record)"
              color="#f50"
              :style="{ 'font-size': '16px', cursor: 'pointer' }"
            >
              <a-icon type="user-add" />
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

    <a-modal title="分配客户" :visible="visibleModal" :footer="null" @cancel="handleCancelModal">
      <a-list bordered size="small" :dataSource="modalList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a href="javascript:;" :style="{color: '#000'}">{{item.label}}</a>
          <a-button type="primary" size="small" @click="handleOkModal(item)">分配</a-button>
        </a-list-item>
      </a-list>
    </a-modal>

    <a-drawer
      :title="this.editList.id ? '编辑客户信息' : '添加客户信息'"
      placement="right"
      destroyOnClose
      :maskClosable="false"
      width="40%"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <Form :editList="editList" @onClose="onClose" />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Form from '@/components/CustomerForm/Form'
import columns from './columns'
import {
  customInfoTab,
  adminSaleList,
  customAllot,
  customExcel
} from '@/api/market'
import { CustomInfoTabType } from '@/types/api'

interface DataSourceType {
  id?: number
  key: number | string
  kouKou: string
  createTime: string
  phone: string
  customLevel: number
  saleName: string
  customRealName: string
  customName: string
  business: string
  weiXin: string
}

interface ListType {
  label?: string
  value?: number | string
}

@Component({
  components: {
    Form
  }
})
export default class CustomerInfo extends Vue {
  private spinning!: boolean
  private dataSource!: DataSourceType[]
  private total!: number
  private current!: number
  private params!: CustomInfoTabType
  private lists!: ListType[]
  private visible!: boolean
  private editList!: any
  private isAddButton!: boolean
  private isSelect!: boolean
  private isImport!: boolean
  private isAllot!: boolean
  private selectedRowKeys!: string
  private visibleModal!: boolean
  private modalList!: ListType[]

  private data() {
    return {
      visible: false,
      spinning: false,
      columns,
      dataSource: [],
      total: 100,
      current: 1,
      params: {
        pageNo: 0,
        saleId: '',
        customName: ''
      },
      lists: [],
      editList: [],
      isAddButton: true,
      isSelect: true,
      isImport: true,
      isAllot: true,
      selectedRowKeys: '',
      visibleModal: false,
      modalList: []
    }
  }

  private created() {
    // 初始化销售 Select
    adminSaleList({ state: '' })
      .then((res: any) => {
        if (res.code === 200) {
          const lists = res.lists.map((item: any) => {
            return {
              label: item.realName,
              value: item.id
            }
          })
          this.lists = [{ label: '全部', value: '' }, ...lists]
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  private mounted() {
    this.isPermisson()
  }

  private isPermisson() {
    const { params } = this
    const USER_INFO = JSON.parse(this.$ls.get('USER_INFO'))
    // 超级管理员
    if (USER_INFO.isManager === 1) {
      this.getCustomInfoTab(params)
      this.isAddButton = false
      this.isSelect = true
      this.isImport = true
      this.isAllot = true
      return
    }
    // 主管
    if (USER_INFO.isManager === 2) {
      params.saleId = USER_INFO.id
      this.getCustomInfoTab(params)
      this.isAddButton = true
      this.isSelect = true
      this.isImport = true
      this.isAllot = true
      this.params = params
      return
    }
    // 普通
    params.saleId = USER_INFO.id
    this.getCustomInfoTab(params)
    this.isAddButton = true
    this.isSelect = false
    this.isImport = false
    this.isAllot = false
    this.params = params
  }

  // 获取Tab信息
  private getCustomInfoTab(params: CustomInfoTabType) {
    this.spinning = true
    return customInfoTab(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.dataSource = res.page.result.map((item: DataSourceType) => {
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

  // 选择分类
  private handleSelect(value: string) {
    const { params } = this
    params.saleId = value
    params.pageNo = 0
    this.getCustomInfoTab(params)
    this.$router.replace({
      query: {
        pageNo: '1'
      }
    })
    this.params = params
  }

  // 添加
  private handleAdd() {
    this.visible = true
    this.editList = {}
  }

  // 关闭抽屉
  private onClose(isClose: boolean) {
    new Promise((resolve, reject) => {
      this.visible = isClose
      resolve()
    }).then(() => {
      const { params } = this
      this.getCustomInfoTab(params)
      this.params = params
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

  // 客户信息跟踪
  private handleFollow(record: any) {
    // this.visible = true
  }

  // 编辑
  private handleEdit(record: any) {
    this.visible = true
    this.editList = record
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

  // 分配 Modal
  private handleAllot() {
    if (this.selectedRowKeys) {
      this.visibleModal = true
      adminSaleList({ state: '1' })
        .then((res: any) => {
          if (res.code === 200) {
            this.modalList = res.lists.map((item: any) => {
              return {
                label: item.realName,
                value: item.id
              }
            })
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }

  // 分配 click
  private handleOkModal(item: { label: string; value: number | string }) {
    const params = {
      customIds: this.selectedRowKeys,
      saleId: +item.value
    }
    customAllot(params).then((res: any) => {
      if (res.code === 200) {
        this.$message.success(res.message)
        new Promise((resolve, reject) => {
          this.visibleModal = false
          resolve()
        }).then(() => {
          const { params } = this
          this.getCustomInfoTab(params)
          this.params = params
        })
      } else {
        this.$message.error(res.message)
      }
    })
  }

  // 取消分配
  handleCancelModal(e: any) {
    this.visibleModal = false
  }

  // 导出
  private handleImport() {
    if (this.selectedRowKeys) {
      customExcel({ customIds: this.selectedRowKeys }).then((res: any) => {
        const blob = new Blob([res], {
          type: 'application/vnd.ms-excel;charset=utf-8'
        })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = '客户导出'
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
}
</script>

<style lang="less" scoped>
.customer-info {
  .customer-header {
    display: flex;
    justify-content: space-between;
  }

  .customer-info-edit {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
  }
}
</style>
