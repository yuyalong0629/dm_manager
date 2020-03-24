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
      selectedKeys: ['3']
    }
  }

  private created() {
    const MENU = this.$ls.get('MENU')
    if (MENU) {
      this.openKeys = MENU.openKeys
      this.selectedKeys = MENU.selectedKeys
    }
  }

  // slidermenu
  private onOpenChange(openKeys: any[]) {
    const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
    console.log(latestOpenKey)

    // 保存状态

    this.$ls.set('MENU', { openKeys: this.openKeys, selectedKeys: this.selectedKeys })

    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }

  // menu
  private onSelectKey({ item, key, selectedKeys }: any) {
    // console.log(item)
    // console.log(key)
    // console.log(selectedKeys)
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
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>员工管理</span></span>
          <a-menu-item key="1">
            <router-link to="/index/management">员工分类</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/index/information">员工信息</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/index/rank">龙虎榜</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="share-alt" /><span>渠道部门</span></span>
          <a-menu-item key="4">
            <router-link to="/index/channelAccounts">渠道公众号</router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <router-link to="/index/channelTok">渠道抖音</router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link to="/index/channelBilibili">渠道B站</router-link>
          </a-menu-item>
          <a-menu-item key="7">
            <router-link to="/index/channelMeipai">渠道B站签约号</router-link>
          </a-menu-item>
          <a-menu-item key="8">
            <router-link to="/index/channelDeftHand">渠道快手</router-link>
          </a-menu-item>
          <a-menu-item key="9">
            <router-link to="/index/channelSina">渠道微博</router-link>
          </a-menu-item>
          <a-menu-item key="10">
            <router-link to="/index/channelRedbook">渠道小红书</router-link>
          </a-menu-item>
          <a-menu-item key="11">
            <router-link to="/index/channelLive">渠道直播</router-link>
          </a-menu-item>
          <a-menu-item key="12">
            <router-link to="/index/channelSearch">渠道查询</router-link>
          </a-menu-item>
          <a-menu-item key="13">
            <router-link to="/index/channelOrder">渠道订单</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="shopping-cart" /><span>销售部门</span></span>
          <a-menu-item key="6">
            <router-link to="/index/customerInfo">客户信息</router-link>
          </a-menu-item>
          <a-menu-item key="7">
            <router-link to="/index/customerAccounts">销售公众号</router-link>
          </a-menu-item>
          <a-menu-item key="8">
            <router-link to="/index/customerTok">销售抖音</router-link>
          </a-menu-item>
          <a-menu-item key="9">
            <router-link to="/index/customerBilibili">销售B站</router-link>
          </a-menu-item>
          <a-menu-item key="10">
            <router-link to="/index/customerMeipai">销售B站美拍号</router-link>
          </a-menu-item>
          <a-menu-item key="11">
            <router-link to="/index/customerDeftHand">销售快手</router-link>
          </a-menu-item>
          <a-menu-item key="12">
            <router-link to="/index/customerSina">销售微博</router-link>
          </a-menu-item>
          <a-menu-item key="13">
            <router-link to="/index/customerRedbook">销售小红书</router-link>
          </a-menu-item>
          <a-menu-item key="14">
            <router-link to="/index/customerLive">销售直播</router-link>
          </a-menu-item>
          <a-menu-item key="15">
            <router-link to="/index/customerPublicBank">客户公库</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    )
  }
}
