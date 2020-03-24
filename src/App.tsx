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
