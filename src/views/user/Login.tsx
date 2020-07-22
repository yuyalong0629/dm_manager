import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { Login } from '@/api/user'
import { timeFix } from '@/utils/tools'

interface FormErr {
  username?: {
    errors: any[]
  }
  password?: {
    errors: any[]
  }
}

interface FormValues {
  username?: string
  password?: string
}

@Component
export default class User extends Vue {
  private form!: any
  private loginBtn!: boolean
  @Mutation SET_LOGIN!: (params: any) => void

  private data() {
    return {
      form: this.$form.createForm(this),
      loginBtn: false
    }
  }

  // Form 提交
  private handleSubmit(e: any) {
    e.preventDefault()
    this.loginBtn = true

    this.form.validateFields((err: FormErr, values: FormValues) => {
      if (!err) {
        Login(values).then((res: any) => {
          if (res.code === 200) {
            this.SET_LOGIN(res.userInfoMap)

            this.$router.push({ path: '/' })
            // 延迟 1 秒显示欢迎信息
            window.location.reload()
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
          this.loginBtn = false
        })
      } else {
        setTimeout(() => {
          this.loginBtn = false
        }, 600)
      }
    })
  }

  render() {
    return (
      <div class="login">
        <a-form
          id="formLogin"
          class="user-layout-login"
          form={this.form}
          on-submit={this.handleSubmit}
        >

          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入用户名"
              v-decorator={[
                'username',
                { rules: [{ required: true, message: '请输入用户名' }], validateTrigger: 'blur' }
              ]}
            >
              <a-icon slot="prefix" type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              type="text"
              placeholder="请输入密码"
              v-decorator={[
                'password',
                { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
              ]}
            >
              <a-icon slot="prefix" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            </a-input-password>
          </a-form-item>

          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={this.loginBtn}
              disabled={this.loginBtn}
            >确定</a-button>
          </a-form-item>
        </a-form>
      </div >
    )
  }
}
