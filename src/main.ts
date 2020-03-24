import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/index'

// 按需引入
import {
  Avatar,
  AutoComplete,
  Button,
  Breadcrumb,
  Checkbox,
  Col,
  Dropdown,
  Divider,
  DatePicker,
  Drawer,
  Form,
  FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  ConfigProvider,
  Menu,
  Modal,
  message,
  notification,
  Pagination,
  Row,
  Select,
  Spin,
  Switch,
  Table,
  Tag,
  Tooltip,
  Upload
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.prototype.$message = message
Vue.prototype.$notification = notification

Vue.use(Avatar)
Vue.use(AutoComplete)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(List)
Vue.use(ConfigProvider)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Upload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
