<template>
  <div class="information">
    <a-spin :spinning="spinning">
      <a-button type="primary" icon="plus-circle" @click="handleAdd">添加员工</a-button>
      <a-divider />
      <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
        <div slot="finalTarget" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="width: 100px;"
            :value="text"
            @change="e => handleChange(e.target.value, record.key)"
          />
          <span style="display: inline-block; width: 100px;" v-else>{{text}}</span>
          <span v-if="record.editable" style="margin: 0 5px;">
            <a @click="() => save(record.key)">保存</a>
          </span>
          <span v-else style="margin: 0 5px; width: 100px;">
            <a @click="() => edit(record.key)">修改</a>
          </span>
        </div>
        <span slot="status" slot-scope="text, record">
          <a-tooltip placement="left" title="编辑">
            <a-tag
              color="#87d068"
              @click="handleEdit(record)"
              :style="{'font-size': '16px', 'margin-right': '8px', cursor: 'pointer'}"
            >
              <a-icon type="edit" />
            </a-tag>
          </a-tooltip>
          <a-tooltip placement="right" :title="text === 1 ? '启用': '停用'">
            <a-tag
              @click="handleDisable(record)"
              :color="text === 1 ? '#DA5054' : '#d9d9d9'"
              :style="{ 'font-size': '16px', cursor: 'pointer' }"
            >
              <a-icon type="poweroff" />
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
      title="添加员工信息"
      placement="right"
      :maskClosable="false"
      width="36%"
      :closable="false"
      @close="onClose"
      :visible="visible"
      destroyOnClose
    >
      <MemberForm @onClose="onClose" :editInfo="visible && editInfo" />
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MemberForm from '@/components/MemberForm/Form'
import columns from './columns'
import {
  tableInfoList,
  enableAndDisable,
  updateFinalTarget
} from '@/api/member'

interface Params {
  pageNo: number
}

interface DataSource {
  [key: string]: string | number | boolean
}

@Component({
  components: {
    MemberForm
  }
})
export default class Information extends Vue {
  private visible!: boolean
  private spinning!: boolean
  private dataSource!: DataSource[]
  private editInfo!: DataSource
  private total!: number
  private current!: number

  private data() {
    return {
      columns,
      visible: false,
      spinning: false,
      dataSource: [],
      total: 100,
      current: 1,
      editInfo: {}
    }
  }

  // 添加
  private handleAdd() {
    this.visible = true
    this.editInfo = {}
  }

  private handleChange(value: any, key: number) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => key === item.key
    )[0]
    if (target) {
      target.finalTarget = value
      this.dataSource = dataSource
    }
  }

  private save(key: number) {
    const dataSource = [...this.dataSource]
    const target = (dataSource as any).filter(
      (item: any) => key === item.key
    )[0]
    if (target) {
      updateFinalTarget({
        id: key,
        finalTarget: target.finalTarget
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

  private edit(key: number) {
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

  // 编辑
  private handleEdit(record: DataSource) {
    this.visible = true
    this.editInfo = record
  }

  // 停用
  private handleDisable(record: DataSource) {
    enableAndDisable({ id: record.id })
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
          this.getTableInfoList({ pageNo: +pageNo - 1 })
        } else {
          this.getTableInfoList({ pageNo: 0 })
        }
      })
  }

  // 子组件 => 关闭抽屉
  private onClose(close: boolean) {
    new Promise((resolve, reject) => {
      this.visible = close
      resolve()
    }).then(() => {
      const pageNo = this.$route.query.pageNo
      if (pageNo) {
        this.getTableInfoList({ pageNo: +pageNo - 1 })
      } else {
        this.getTableInfoList({ pageNo: 0 })
      }
    })
  }

  private mounted() {
    const pageNo = this.$route.query.pageNo
    if (pageNo) {
      this.getTableInfoList({ pageNo: +pageNo - 1 })
    } else {
      this.getTableInfoList({ pageNo: 0 })
    }
  }

  // Table list function
  private getTableInfoList(params: Params) {
    this.spinning = true
    return tableInfoList(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.dataSource = res.page.result.map((item: DataSource) => {
            return {
              ...item,
              key: item.id,
              realName: item.realName,
              userName: item.userName,
              type: item.type,
              phone: item.phone,
              finalTarget: item.finalTarget,
              status: item.status
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

  // 分页
  private onChangePage(pageNumber: number) {
    this.getTableInfoList({ pageNo: +pageNumber - 1 })

    this.$router.replace({
      query: {
        pageNo: pageNumber + ''
      }
    })
  }
}
</script>

<style lang="less">
</style>
