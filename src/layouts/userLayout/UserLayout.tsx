import { Component, Vue } from 'vue-property-decorator'
import './index.less'

@Component
export default class UserLayout extends Vue {
  render() {
    const logo = require('@/assets/image/logo.png')

    return (
      <div id="userLayout">
        <div class="container">

          <div class="top">
            <div class="header">
              <a href="javascript:;">
                <img src={logo} class="title" alt="logo" />
              </a>
            </div>
            <div class="desc">春有百花秋有月,  夏有凉风冬有雪</div>
          </div>

          <router-view />

          <div class="footer">
            <div class="links">
              <a href="javascript:;">帮助</a>
              <a href="javascript:;">隐私</a>
              <a href="javascript:;">条款</a>
            </div>
            <div class="copyright">Copyright &copy; 2020 杭州羽联信息科技技术部出品</div>
          </div>

        </div>
      </div>
    )
  }
}
