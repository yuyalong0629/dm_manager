import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/index'

// 按需引入
import {
  Avatar,
  Button,
  Breadcrumb,
  Dropdown,
  Form,
  Icon,
  Input,
  Layout,
  Menu
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Avatar)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
