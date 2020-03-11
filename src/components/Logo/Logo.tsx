import { Component, Vue } from 'vue-property-decorator'
import './index.less'

@Component
export default class Logo extends Vue {
  render() {
    const logo = require('@/assets/image/logo.png')

    return (
      <a href="javascript:;" class="logo">
        <img src={logo} width="100%" alt="Logo" />
      </a>
    )
  }
}
