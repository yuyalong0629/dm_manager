import { Component, Vue } from 'vue-property-decorator'
import './index.less'

@Component
export default class HeaderMenu extends Vue {
  public render() {
    return (
      <a-dropdown>

        <span class="user-dropdown-menu">
          <a-avatar style="backgroundColor: #87D068; marginRight: 12px;" icon="user" />
          <span class="username" style={{ 'font-size': '14px', 'font-weight': 600 }}>尊敬的管理员, 您好!</span>
        </span>

        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0" style={{ 'text-align': 'center' }}>
            <a-icon type="user" style="marginRight: 4px;" />
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="1" style={{ 'text-align': 'center' }}>
            <a href="javascript:;">
              <a-icon type="logout" style="marginRight: 4px;" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>

      </a-dropdown>
    )
  }
}
