import { Component, Vue } from 'vue-property-decorator'
import './assets/style/global.less'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

@Component
export default class App extends Vue {
  private locale!: any

  private data() {
    return {
      locale: zhCN
    }
  }

  private mounted() {
    const USER_INFO = JSON.parse(this.$ls.get('USER_INFO'))

    if (USER_INFO && USER_INFO.duty === 2) {
      this.$router.replace({ path: '/index/channelRank' })
    } else {
      this.$router.replace({ path: '/index/rank' })
    }
  }

  render() {
    return (
      <a-config-provider locale={this.locale}>
        <div id="app">
          <router-view />
        </div>
      </a-config-provider>
    )
  }
}
