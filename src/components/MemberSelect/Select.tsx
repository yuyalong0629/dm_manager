import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import './index.less'

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
      checkedList: e.target.checked ? Object.values(this.selectList.childList.map((item: any) => item.value)) : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
    // data Emit
    const { checkedList } = this
    const selectList = { ...this.selectList } // 浅拷贝

    const target = checkedList.map((item: any) => {
      return selectList.childList.filter((d: any) => item === d.value)[0]
    })
    selectList.childList = target

    this.checkedList = checkedList
    // console.log(selectList)
    this.emitSelect(selectList)
  }

  // 员工管理 二级菜单
  private onChange(checkedList: any) {
    this.indeterminate = !!checkedList.length && (checkedList.length < this.selectList.childList.length)
    this.checkAll = checkedList.length === this.selectList.childList.length

    // data Emit
    const selectList = { ...this.selectList }

    const target = checkedList.map((item: any) => {
      return selectList.childList.filter((d: any) => item === d.value)[0]
    })
    selectList.childList = target

    // console.log(selectList)
    this.emitSelect(selectList)
  }

  @Emit('emitSelect')
  private emitSelect(selectList: any) {
    return selectList
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
            <span style={{ 'font-weight': '600', color: '#DA5054' }}>{this.selectList.parentList.title}</span>
          </a-checkbox>
        </div>
        <br />
        <a-checkbox-group options={this.selectList.childList} v-model={this.checkedList} on-change={this.onChange}></a-checkbox-group>
      </div >
    )
  }
}
