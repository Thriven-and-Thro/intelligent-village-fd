import { formatUTCString } from "@/utils/date-format"

// 通过 app.config.globalProperties 定义全局变量
export default function formatTime(value: string) {
  return formatUTCString(value)
}
