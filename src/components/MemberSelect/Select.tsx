import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Select extends Vue {
  @Prop() selectList!: any

  private indeterminate!: boolean
  private checkAll!: boolean
  private checkedList!: any[]

  private data() {
    return {
      indeterminate: false,
      checkedList: [],
      checkAll: false
    }
  }

  // 员工管理 一级菜单
  private onCheckAllChange(e: any) {
    Object.assign(this, {
      checkedList: e.target.checked ? this.selectList.childList.map((item: any) => item.label) : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
    console.log(this.checkedList)
  }

  // 员工管理 二级菜单
  private onChange(checkedList: any) {
    console.log(checkedList)
    this.indeterminate = !!checkedList.length && (checkedList.length < this.selectList.childList.length)
    this.checkAll = checkedList.length === this.selectList.childList.length
  }

  public render() {
    return (
      <div class="select">
        <div style={{ 'border-bottom': '1px solid #E9E9E9' }}>
          <a-checkbox
            indeterminate={this.indeterminate}
            on-change={this.onCheckAllChange}
            checked={this.checkAll}
          >
            <span style={{ 'font-weight': '600', color: '#DA5054' }}>{this.selectList.title}</span>
          </a-checkbox>
        </div>
        <br />
        <a-checkbox-group on-change={this.onChange} >
          {this.selectList.childList.map((item: any) => {
            return <a-checkbox value={item} style={{ width: '140px', 'margin-left': 0 }}>{item.label}</a-checkbox>
          })}
        </a-checkbox-group>
      </div >
    )
  }
}
