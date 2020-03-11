import { Component, Vue } from 'vue-property-decorator'
import './assets/style/global.less'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
