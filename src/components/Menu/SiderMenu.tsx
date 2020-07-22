import { Component, Vue, Prop } from 'vue-property-decorator'
import { menu } from '@/api/user'
import './index.less'

@Component
export default class SideMenu extends Vue {
  @Prop({ default: false }) private collapsed!: boolean

  private rootSubmenuKeys!: string[]
  private openKeys!: string[]
  private selectedKeys!: string[]
  private typeRoleMapList!: any[]

  private data() {
    return {
      rootSubmenuKeys: [],
      openKeys: [],
      selectedKeys: [],
      typeRoleMapList: []
    }
  }

  private mounted() {
    menu().then((res: any) => {
      if (res.code === 200) {
        this.typeRoleMapList = res.typeRoleMapList
        console.log(this.typeRoleMapList)
      }
    })
  }

  // slidermenu
  private onOpenChange(openKeys: any[]) {
    const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
    console.log(latestOpenKey)
    console.log(openKeys)

    // 保存状态
    // this.$ls.set('MENU', { openKeys: this.openKeys, selectedKeys: this.selectedKeys })

    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }

  // menu
  private onSelectKey({ item, key, selectedKeys }: any) {
    this.selectedKeys = selectedKeys
    this.$ls.set('MENU', { openKeys: this.openKeys, selectedKeys: this.selectedKeys })
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
        {this.typeRoleMapList.map((item: any) => {
          return <a-sub-menu key={item.parentList.id}>
            <span slot="title"><a-icon type="user" /><span>{item.parentList.roleName}</span></span>
            {item.childList.map((d: any) => {
              return <a-menu-item key={d.id}>
                <router-link to={d.roleUrl}>{d.roleName}</router-link>
              </a-menu-item>
            })}
          </a-sub-menu>
        })}
      </a-menu>
    )
  }
}
