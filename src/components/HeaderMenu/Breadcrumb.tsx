import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Breadcrumb extends Vue {
  render() {
    const breadcrumb = this.$route.meta.title

    return (
      <a-breadcrumb>
        {breadcrumb.map((item: any) => {
          return <a-breadcrumb-item>{item}</a-breadcrumb-item>
        })}
      </a-breadcrumb>
    )
  }
}
