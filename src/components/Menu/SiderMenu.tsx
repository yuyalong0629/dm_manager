import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class SideMenu extends Vue {
  @Prop({ default: false }) private collapsed!: boolean

  private rootSubmenuKeys!: string[]
  private openKeys!: string[]
  private selectedKeys!: string[]

  private data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
      openKeys: ['sub1'],
      selectedKeys: ['2']
    }
  }

  // slidermenu
  private onOpenChange(openKeys: any[]) {
    const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
    console.log(latestOpenKey)

    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }

  // menu
  private onSelectKey({ item, key, selectedKeys }: any) {
    console.log(item)
    console.log(key)
    console.log(selectedKeys)
    this.selectedKeys = selectedKeys
  }

  render() {
    return (
      <a-menu
        mode="inline"
        theme="dark"
        openKeys={this.openKeys}
        selectedKeys={this.selectedKeys}
        style={{ padding: '16px 0px', height: '100%', 'border-right': 0 }}
        on-openChange={this.onOpenChange}
        on-select={this.onSelectKey}
      >
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>员工管理</span></span>
          <a-menu-item key="1">option1</a-menu-item>
          <a-menu-item key="2">option2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="share-alt" /><span>渠道部门</span></span>
          <a-menu-item key="3">option5</a-menu-item>
          <a-menu-item key="4">option6</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="shopping-cart" /><span>销售部门</span></span>
          <a-menu-item key="5">option5</a-menu-item>
          <a-menu-item key="6">option6</a-menu-item>
          <a-menu-item key="7">option7</a-menu-item>
          <a-menu-item key="8">option8</a-menu-item>
        </a-sub-menu>
      </a-menu>
    )
  }
}
