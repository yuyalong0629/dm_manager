<template>
  <div class="management">
    <a-spin :spinning="spinning">
      <a-button type="primary" icon="plus-circle" @click="handleAdd">添加分类</a-button>
      <a-divider />
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
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
          <a-tooltip placement="right" title="删除">
            <a-tag
              @click="handleDelete(record)"
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

    <a-drawer
      :title="title"
      placement="right"
      :maskClosable="false"
      width="60%"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <a-row :style="{ marginBottom: '32px' }">
        <a-col span="3">
          <label>员工分类名：</label>
        </a-col>
        <a-col span="21">
          <a-input v-model="adminName" placeholder="请输入分类名称" />
        </a-col>
      </a-row>

      <a-row>
        <a-col span="24">
          <label>设置权限：</label>
        </a-col>

        <a-col
          v-for="(item, index) in selectListData"
          :key="index"
          :span="21"
          :offset="3"
          :style="{ marginBottom: '48px' }"
        >
          <MemberSelect :selectList="item" @emitSelect="emitSelect" />
        </a-col>
      </a-row>
      <div
        :style="{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 14%',
              background: '#fff',
              textAlign: 'left'
            }"
      >
        <a-button :style="{ marginRight: '24px' }" @click="onClose">取消</a-button>
        <a-button @click="onsubmit" type="primary">确定</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MemberSelect from '@/components/MemberSelect/Select'
import selectListData from './select'
import columns from './columns'
import {
  tableClassList,
  tableClassDelete,
  classAddOrUpdate,
  classAdddetail
} from '@/api/member'

interface Params {
  pageNo: number
}

interface DataSource {
  [key: string]: string | number
}

@Component({
  components: {
    MemberSelect
  }
})
export default class Management extends Vue {
  private visible!: boolean
  private spinning!: boolean
  private dataSource!: DataSource
  private total!: number
  private current!: number
  private selectAllList!: any[]
  private adminName!: string
  private title!: string
  private recordId?: number | string

  private data() {
    return {
      visible: false,
      spinning: false,
      columns,
      selectListData,
      dataSource: [],
      total: 100,
      current: 1,
      selectAllList: [],
      adminName: '',
      title: '添加员工分类',
      recordId: undefined
    }
  }

  private mounted() {
    const pageNo = this.$route.query.pageNo
    if (pageNo) {
      this.getTableClassList({ pageNo: +pageNo - 1 })
    } else {
      this.getTableClassList({ pageNo: 0 })
    }
  }

  // 编辑
  private handleEdit(record: DataSource) {
    this.visible = true
    this.recordId = record.key
    this.title = '编辑员工分类'
    classAdddetail({ adminTypeId: record.key }).then((res: any) => {
      if (res.code === 200) {
        this.adminName = res.adminType.adminName || ''

        const target = selectListData.map((item: any) => {
          const list = res.typeRoleMapList.map((d: any) => {
            if (item.parentList.roleName === d.parentList.roleName) {
              return d.childList.map((i: any) => i.roleName)
            }
          })
          return {
            ...item,
            checkedList: list.flat().filter((n: any) => n !== undefined)
          }
        })
        ;(this as any).selectListData = target
      }
    })
  }

  // 删除
  private handleDelete(record: DataSource) {
    tableClassDelete({ id: record.key })
      .then((res: any) => {
        if (res.code === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
      .finally(() => {
        const pageNo = this.$route.query.pageNo
        if (pageNo) {
          this.getTableClassList({ pageNo: +pageNo - 1 })
        } else {
          this.getTableClassList({ pageNo: 0 })
        }
      })
  }

  // select
  private emitSelect(selectList: any) {
    const { selectAllList } = this

    if (!selectAllList.length) {
      selectAllList.push(selectList)
    } else {
      const findIndex = selectAllList.findIndex(
        (item: any) =>
          selectList.parentList.roleName === item.parentList.roleName
      )
      if (findIndex === -1) {
        selectAllList.push(selectList)
      } else if (findIndex !== -1 && !selectList.childList.length) {
        selectAllList.splice(findIndex, 1)
      } else {
        selectAllList.splice(findIndex, 1, selectList)
      }
    }

    this.selectAllList = selectAllList
  }

  // Table list function
  private getTableClassList(params: Params) {
    this.spinning = true
    return tableClassList(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.dataSource = res.page.result.map((item: DataSource) => {
            return {
              key: item.id,
              adminName: item.adminName,
              status: item.status === 1 ? '启用' : '停用'
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

  // 添加分类 抽屉
  private handleAdd() {
    this.visible = true
    this.recordId = undefined
    this.title = '添加员工分类'
  }

  // 关闭抽屉
  private onClose() {
    new Promise((resolve, reject) => {
      this.visible = false
      resolve()
    }).then(() => {
      const pageNo = this.$route.query.pageNo
      if (pageNo) {
        this.getTableClassList({ pageNo: +pageNo - 1 })
      } else {
        this.getTableClassList({ pageNo: 0 })
      }
    })
  }

  // 提交
  private onsubmit() {
    const params = {
      adminName: this.adminName,
      id: this.recordId,
      roleList: JSON.stringify(this.selectAllList.filter(item => item.childList.length))
    }
    classAddOrUpdate(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.visible = false
          this.$message.success(res.message)
        } else {
          this.visible = false
          this.$message.error(res.message)
        }
      })
      .finally(() => {
        const pageNo = this.$route.query.pageNo
        if (pageNo) {
          this.getTableClassList({ pageNo: +pageNo - 1 })
        } else {
          this.getTableClassList({ pageNo: 0 })
        }
      })
  }

  // 分页
  private onChangePage(pageNumber: number) {
    this.getTableClassList({ pageNo: +pageNumber - 1 })

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
