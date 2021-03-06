import { Component, Vue } from 'vue-property-decorator'
import { rank } from '@/api/member'
import './index.less'

interface DutyListType {
  id: number
  phone: string
  finalProfit: number
  finalTarget: number
  duty: number
  status: number
  img: string
  adminTypeId: number
  userName: number | string
  isManager: number
  realName: string
  type: number | string
}

@Component
export default class Rank extends Vue {
  private dutyList!: DutyListType[]
  private adminList!: any
  private normalList!: any
  private spinning!: boolean
  private timePercent?: string
  private firstSales?: string

  private data() {
    return {
      dutyList: [],
      adminList: [],
      normalList: [],
      timePercent: undefined,
      spinning: false,
      firstSales: false
    }
  }

  private mounted() {
    this.spinning = true

    rank({ type: 2 }).then((res: any) => {
      if (res.code === 200) {
        this.timePercent = res.timePercent
        this.firstSales = res.firstchannel

        this.dutyList = res.adminList.filter((item: DutyListType) => item.isManager === 2)
        const imgList = [require('@/assets/image/one.png'), require('@/assets/image/two.png'), require('@/assets/image/three.png')]
        const normalList = res.adminList.filter((item: any) => item.isManager === 0)
        this.adminList = normalList.slice(0, 3).map((item: any, index: number) => {
          return { ...item, img: imgList[index] }
        })
        this.normalList = normalList.slice(3)
      }
    }).finally(() => {
      this.spinning = false
    })
  }

  public render() {
    const boss = require('@/assets/image/boss.png')

    return (
      <div class="rank">
        <div class="rank-content">
          <a-spin spinning={this.spinning}>
            <ul class="rank-content-top">
              <li>
                <ul>
                  <li>排名</li>
                  <li>销售名字</li>
                  <li>当月业绩</li>
                  <li>当月目标</li>
                  <li>完成率</li>
                </ul>
              </li>
              {this.adminList.map((item: any) => {
                return <li>
                  <ul>
                    <li>
                      <img src={item.img} alt="" />
                    </li>
                    <li>{item.realName}</li>
                    <li>{item.finalProfit}</li>
                    <li>{item.finalTarget}</li>
                    <li>{item.percent}</li>
                  </ul>
                </li>
              })}
            </ul>
            <ul class="rank-content-list">
              {this.normalList.map((item: any, index: number) => {
                return <li>
                  <ul>
                    <li>{this.adminList.length + index + 1}</li>
                    <li>{item.realName}</li>
                    <li>{item.finalProfit}</li>
                    <li>{item.finalTarget}</li>
                    <li>{item.percent}</li>
                  </ul>
                </li>
              })}
            </ul>
            <ul class="rank-content-footer">
              {this.dutyList.map((item: DutyListType) => {
                return <li>
                  <ul>
                    <li>
                      <img src={boss} alt="" />
                    </li>
                    <li>{item.realName}</li>
                    <li>{item.finalProfit}</li>
                  </ul>
                </li>
              })}
            </ul>
          </a-spin>
        </div>
        <div class="rank-time">
          <label>时间完成率：</label>
          <p>{this.timePercent}</p>
        </div>
        <div class="rank-left">
          <label>渠道总业绩</label>
          <p>{this.firstSales}</p>
        </div>
      </div >
    )
  }
}
