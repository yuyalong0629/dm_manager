import { Component, Vue } from 'vue-property-decorator'
import { Logout, updatePwd } from '@/api/user'
import './index.less'

@Component
export default class HeaderMenu extends Vue {
  private visible!: boolean
  private confirmLoading!: boolean
  private password1?: string
  private password2?: string

  private data() {
    return {
      visible: false,
      confirmLoading: false,
      password1: undefined,
      password2: undefined
    }
  }

  private handleLogout() {
    Logout().then((res: any) => {
      if (res.code === 200) {
        this.$message.success(res.message)
        setTimeout(() => {
          window.location.reload()
          window.localStorage.clear()
        }, 500)
      } else {
        this.$message.error(res.message)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  private handleEdit() {
    this.visible = true
    console.log(this.visible)
  }

  handleOk(e: any) {
    if (this.password2 !== this.password1) {
      this.$message.error('两次密码不一样')
    } else {
      this.confirmLoading = true
      const USER_INFO = JSON.parse(this.$ls.get('USER_INFO'))

      updatePwd({ password: this.password1, adminId: USER_INFO.id }).then((res: any) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.visible = false
          this.confirmLoading = false
        } else {
          this.$message.error(res.message)
          this.visible = true
          this.confirmLoading = false
        }
      }).finally(() => {
        this.visible = false
        this.confirmLoading = false
      })
    }
  }

  handleCancel(e: any) {
    this.visible = false
  }

  public render() {
    const USER_INFO = JSON.parse(this.$ls.get('USER_INFO'))

    return (
      <div>
        <a-dropdown>

          <span class="user-dropdown-menu">
            <a-avatar style="backgroundColor: #87D068; marginRight: 12px;" icon="user" />
            <span class="username" style={{ 'font-size': '14px', 'font-weight': 600 }}>尊敬的{USER_INFO.realName}, 您好!</span>
          </span>

          <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item key="0" style={{ 'text-align': 'center' }}>
              <a href="javascript:;" on-click={this.handleEdit}>
                <a-icon type="user" style="marginRight: 4px;" />
                <span>修改密码</span>
              </a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1" style={{ 'text-align': 'center' }}>
              <a href="javascript:;" on-click={this.handleLogout}>
                <a-icon type="logout" style="marginRight: 4px;" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>

        </a-dropdown>
        <a-modal
          title="修改密码"
          width="400px"
          visible={this.visible}
          on-ok={this.handleOk}
          confirmLoading={this.confirmLoading}
          on-cancel={this.handleCancel}
        >
          <a-input-password v-model={this.password1} placeholder="请输入密码" style="marginBottom: 24px;" />
          <a-input-password v-model={this.password2} placeholder="请确认密码" />
        </a-modal>
      </div>
    )
  }
}
