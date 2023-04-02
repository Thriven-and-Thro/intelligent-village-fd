import { defineStore } from "pinia"

import { getChart } from "@/service/dashboard/dashboard"
import localCache from "@/utils/cache"
import formatTime from "@/global/register-properties"

const useDashboardStore = defineStore("dashboard", () => {
  const userInfo = localCache.getCache("userInfo")

  // 建立对象是为了方便动态获取、写入数据
  const dashboardStore: Record<string, any> = reactive({
    bar: [],
    pie: [],
    line: []
  })

  // 动态写入
  function setStoreChart(name: string, data: any) {
    dashboardStore[`${name}`] = data
  }

  // 动态请求
  async function requestChartAction(name: string, payload: any = {}) {
    const result = await getChart("chart", {
      chart: name,
      ...payload
    })

    setStoreChart(name, result)
  }

  async function requestAllCharts() {
    for (const item in dashboardStore) {
      await requestChartAction(item, {
        aid: userInfo.aid
      })
    }
  }

  return {
    dashboardStore,
    requestChartAction,
    requestAllCharts
  }
})

export default useDashboardStore
