/*
 * @Author: yylong
 * @Date: 2020-03-11 10:10:24
 * @LastEditTime: 2020-03-11 10:11:23
 * @Description: In User Settings Edit
 */

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}
