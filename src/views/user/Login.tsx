import { Component, Vue } from 'vue-property-decorator'

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

  private data() {
    return {
      form: this.$form.createForm(this),
      loginBtn: false
    }
  }

  private handleSubmit(e: any) {
    e.preventDefault()
    this.loginBtn = true

    this.form.validateFields((err: FormErr, values: FormValues) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.$ls.set('ACCESS_TOKEN', true)
        this.$router.push({ path: '/' })
        this.loginBtn = false
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
            <a-input
              size="large"
              type="text"
              placeholder="请输入密码"
              v-decorator={[
                'password',
                { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
              ]}
            >
              <a-icon slot="prefix" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
            </a-input>
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
