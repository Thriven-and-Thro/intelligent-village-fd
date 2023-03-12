// 时间格式化
// 使用day.js库
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

// 扩展utc方法
dayjs.extend(utc)

// 定义转换格式
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"

// utc转化函数
export function formatUTCString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 解析utc =》 东八区偏移 =》 格式化
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
