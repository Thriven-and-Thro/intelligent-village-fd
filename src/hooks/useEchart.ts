// 对echart进行封装，之后需要echart只需调用此hook
import * as echarts from "echarts"

// 此处要在shims-vue声明以下json，不然报错
import chinaMapData from "@/basic-ui/echart/data/china.json"
echarts.registerMap("china", chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el, undefined, { renderer: "svg" })

  const setOptions = (options: any) => {
    echartInstance.setOption(options)
  }

  // 窗口变化时resize
  window.addEventListener("resize", () => {
    echartInstance.resize()
  })
  // 手动resize
  const setResize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    setResize
  }
}
