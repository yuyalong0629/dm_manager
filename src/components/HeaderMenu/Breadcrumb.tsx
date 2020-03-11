import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Breadcrumb extends Vue {
  render() {
    return (
      <a-breadcrumb>
        <a-breadcrumb-item>员工管理</a-breadcrumb-item>
        <a-breadcrumb-item>系统设置</a-breadcrumb-item>
      </a-breadcrumb>
    )
  }
}
