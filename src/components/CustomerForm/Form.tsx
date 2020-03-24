import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'
import { addOrUpdate } from '@/api/market'

interface CustomerLevelType {
  label: string
  value: number
}

@Component
export default class Form extends Vue {
  @Prop() editList!: any

  private form!: any
  private customerLevel!: CustomerLevelType[]

  private data() {
    return {
      form: this.$form.createForm(this),
      customerLevel: [{ label: '一级', value: 1 }, { label: '二级', value: 2 }, { label: '三级', value: 3 }]
    }
  }

  // 添加员工信息
  private handleSubmit(e: any) {
    e.preventDefault()

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (!this.editList.id) {
          addOrUpdate(values).then((res: any) => {
            if (res.code === 200) {
              this.onClose(false)
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
              this.onClose(true)
            }
            console.log(res)
          }).catch((err: any) => {
            console.log(err)
          })
        } else {
          addOrUpdate({ ...values, id: this.editList.id }).then((res: any) => {
            if (res.code === 200) {
              this.onClose(false)
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
              this.onClose(true)
            }
            console.log(res)
          }).catch((err: any) => {
            console.log(err)
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
  private onClose(isClose: boolean) {
    return isClose
  }

  @Watch('editList', { immediate: true, deep: true })
  private watchEditList(value: any) {
    if (value.id) {
      console.log(value)
      this.$nextTick(() => {
        this.form.setFieldsValue(value)
      })
    }
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
            label="客户名称："
          >
            <a-input
              placeholder="请输入客户名称"
              disabled={this.editList.customName ? true : false}
              v-decorator={[
                'customName',
                { rules: [{ required: true, message: '请输入客户名称' }] }
              ]}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="对接人姓名："
          >
            <a-input
              placeholder="请输入对接人姓名"
              disabled={this.editList.customRealName ? true : false}
              v-decorator={[
                'customRealName',
                { rules: [{ required: true, message: '请输入对接人姓名' }] }
              ]}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="所属行业："
          >
            <a-input
              placeholder="请输入所属行业"
              disabled={this.editList.business ? true : false}
              v-decorator={[
                'business',
                { rules: [{ required: true, message: '请输入所属行业' }] }
              ]}
            />
          </a-form-item>

          <a-form-item
            label="客户分级："
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
          >
            <a-select
              disabled={this.editList.customLevel ? true : false}
              v-decorator={[
                'customLevel',
                { rules: [{ required: true, message: '请选择客户分级!' }] }
              ]}
              placeholder="请选择客户分级"
            >
              {this.customerLevel.map((item: any) => {
                return <a-select-option value={item.value}>{item.label}</a-select-option>
              })}
            </a-select>
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="手机号："
          >
            <a-input
              disabled={this.editList.phone ? true : false}
              placeholder="请输入手机号"
              v-decorator={['phone']}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="微信号："
          >
            <a-input
              disabled={this.editList.weiXin ? true : false}
              placeholder="请输入微信号"
              v-decorator={['weiXin']}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="QQ号："
          >
            <a-input
              placeholder="请输入QQ号"
              disabled={this.editList.kouKou ? true : false}
              v-decorator={['kouKou']}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="链接："
          >
            <a-input
              placeholder="请输入链接"
              disabled={this.editList.comUrl ? true : false}
              v-decorator={['comUrl']}
            />
          </a-form-item>

          <a-form-item
            label-col={{ span: 5 }}
            wrapper-col={{ span: 19 }}
            label="备注："
          >
            <a-textarea
              placeholder="请输入备注"
              v-decorator={['remark']}
              disabled={this.editList.remark ? true : false}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </a-form-item>

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
