import { Component, Vue } from 'vue-property-decorator'
import SiderMenu from '@/components/Menu/SiderMenu'
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu'
import Breadcrumb from '@/components/HeaderMenu/Breadcrumb'
import Logo from '@/components/Logo/Logo'

import './index.less'

@Component({
  components: {
    SiderMenu
  }
})
export default class BasicLayout extends Vue {
  private collapsed!: boolean

  private data() {
    return {
      collapsed: false
    }
  }

  public render() {
    return (
      <a-layout id="manager-basicLayout" style={{ height: '100vh' }}>
        <a-layout-sider
          trigger={null}
          collapsible
          v-model={this.collapsed}
          style="overflow-y: hidden;"
        >
          <Logo />

          <SiderMenu props={{ collapsed: this.collapsed }} />

        </a-layout-sider>

        <a-layout>
          <a-layout-header class="manager-basicLayout-header" style="background: #fff;">
            <Breadcrumb />
            <HeaderMenu />
          </a-layout-header>

          <a-layout-content style={{ margin: '12px 12px 0', padding: '12px', background: '#fff', minHeight: '280px' }}>
            Content
          </a-layout-content>

          <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
          </a-layout-footer>
        </a-layout>

      </a-layout >
    )
  }
}
