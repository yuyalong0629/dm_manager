import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import Upload from '../Upload/Upload'
import { typeList, addOrUpdate } from '@/api/member'

interface AdminTypes {
  id?: number
  adminName?: string
  status?: number
}

interface DataSource {
  [key: string]: string | number
}

@Component
export default class Form extends Vue {
  @Prop() editInfo!: DataSource

  private form!: any
  private adminTypes!: AdminTypes[]
  private typeList!: string[]
  private isManagerList!: DataSource[]
  private dutyList!: DataSource[]

  private data() {
    return {
      form: this.$form.createForm(this),
      adminTypes: [],
      typeList: ['销售1组', '销售2组', '销售3组', '渠道1组'],
      isManagerList: [{ label: '普通', value: 0 }, { label: '超级管理员', value: 1 }, { label: '主管', value: 2 }, { label: '会计', value: 3 }],
      dutyList: [{ label: '销售', value: 1 }, { label: '渠道', value: 2 }, { label: '其他', value: 3 }]
    }
  }

  private mounted() {
    // 获取所属部门分类
    typeList().then((res: any) => {
      if (res.code === 200) {
        this.adminTypes = res.adminTypes
      }
    }).catch((err: any) => {
      console.log(err)
    })

    this.$nextTick(() => {
      if (this.editInfo.id) {
        this.form.setFieldsValue(this.editInfo)
      }
    })
  }

  // 添加员工信息
  private handleSubmit(e: any) {
    e.preventDefault()

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (!this.editInfo.id) {
          addOrUpdate(values).then((res: any) => {
            if (res.code === 200) {
              this.$message.success(res.message)

              // 关闭父组件 Drawer
              this.onClose(false)
            } else {
              this.$message.error(res.message)
              this.onClose(true)
            }
          }).catch(() => {
            this.$message.error('添加失败')
          })
        } else {
          addOrUpdate({ ...values, id: this.editInfo.id }).then((res: any) => {
            if (res.code === 200) {
              this.$message.success(res.message)

              // 关闭父组件 Drawer
              this.onClose(false)
            } else {
              this.$message.error(res.message)
              this.onClose(true)
            }
          }).catch(() => {
            this.$message.error('编辑失败')
          })
        }
      }
    })
  }

  // 取消
  private handleCancel() {
    this.onClose(false)
  }

  // 触发父组件 弹出层 Emit 事件
  @Emit('onClose')
  private onClose(close: boolean) {
    return close
  }

  public render() {
    return (
      <div class="memberForm">
        <a-form
          form={this.form}
          on-submit={this.handleSubmit}
        >
          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="真实姓名："
          >
            <a-input
              placeholder="请输入姓名"
              v-decorator={[
                'realName',
                { rules: [{ required: true, message: '请输入姓名' }] }
              ]}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="用户名："
          >
            <a-input
              placeholder="请输入用户名"
              v-decorator={[
                'userName',
                { rules: [{ required: true, message: '请输入用户名' }] }
              ]}
            />
          </a-form-item>

          <a-form-item
            label="所属部门"
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
          >
            <a-select
              v-decorator={[
                'adminTypeId',
                { rules: [{ required: true, message: '请选择所属部门!' }] }
              ]}
              placeholder="请选择所属部门"
            >
              {this.adminTypes.map((item: AdminTypes) => {
                return <a-select-option value={item.id}>{item.adminName}</a-select-option>
              })}
            </a-select>
          </a-form-item>

          <a-form-item
            label="所属组别"
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
          >
            <a-select
              v-decorator={['type']}
              placeholder="请选择所属组别"
            >
              {this.typeList.map((item: string) => {
                return <a-select-option value={item}>{item}</a-select-option>
              })}
            </a-select>
          </a-form-item>

          <a-form-item
            label="所属身份"
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
          >
            <a-select
              v-decorator={[
                'isManager',
                { rules: [{ required: true, message: '请选择所属身份!' }] }
              ]}
              placeholder="请选择所属身份"
            >
              {this.isManagerList.map((item: any) => {
                return <a-select-option value={item.value}>
                  {item.label}
                </a-select-option>
              })}
            </a-select>
          </a-form-item>

          <a-form-item
            label="所属职务"
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
          >
            <a-select
              v-decorator={[
                'duty',
                { rules: [{ required: true, message: '请选择所属职务!' }] }
              ]}
              placeholder="请选择所属职务"
            >
              {this.dutyList.map((item: any) => {
                return <a-select-option value={item.value}>
                  {item.label}
                </a-select-option>
              })}
            </a-select>
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="联系电话："
          >
            <a-input
              placeholder="请输入联系电话"
              v-decorator={[
                'phone',
                { rules: [{ required: true, message: '请输入联系电话' }] }
              ]}
            />
          </a-form-item>

          {/* <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="用户头像："
          >
            <Upload />
          </a-form-item> */}

          <a-form-item
            wrapper-col={{ span: 12, offset: 5 }}
          >
            <a-button
              on-click={this.handleCancel}
              style={{ margin: '0 12px 0 0' }}
            >
              取消
            </a-button>
            <a-button
              type="primary"
              html-type="submit"
            >
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    )
  }
}
