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
  private spinning!: boolean

  private data() {
    return {
      dutyList: [],
      spinning: false
    }
  }

  private mounted() {
    this.spinning = true

    rank({ type: 1 }).then((res: any) => {
      if (res.code === 200) {
        this.dutyList = res.adminList.filter((item: DutyListType) => item.isManager === 2)
      }
    }).finally(() => {
      this.spinning = false
    })
  }

  public render() {
    const one = require('@/assets/image/one.png')
    const two = require('@/assets/image/two.png')
    const three = require('@/assets/image/three.png')
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
              <li>
                <ul>
                  <li>
                    <img src={one} alt="" />
                  </li>
                  <li>彭心怡</li>
                  <li>39585</li>
                  <li>100000</li>
                  <li>39.5%</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <img src={two} alt="" />
                  </li>
                  <li>彭心怡</li>
                  <li>39585</li>
                  <li>100000</li>
                  <li>39.5%</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <img src={three} alt="" />
                  </li>
                  <li>彭心怡</li>
                  <li>39585</li>
                  <li>100000</li>
                  <li>39.5%</li>
                </ul>
              </li>
            </ul>
            <ul class="rank-content-list">
              <li>
                <ul>
                  <li>4</li>
                  <li>彭心怡</li>
                  <li>39585</li>
                  <li>100000</li>
                  <li>39.5%</li>
                </ul>
              </li>
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
          <p>45.1%</p>
        </div>
        <div class="rank-left">
          <label>战狼队总业绩</label>
          <p>174832</p>
        </div>
        <div class="rank-right">
          <label>巅峰队总业绩</label>
          <p>88655</p>
        </div>
      </div >
    )
  }
}
