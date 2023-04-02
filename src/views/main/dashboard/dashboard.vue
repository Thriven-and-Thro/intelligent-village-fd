<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="12">
        <pie-echart :pieData="categoryGoodsCount" />
      </el-col>
      <el-col :span="12">
        <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="24">
        <line-echart v-bind="categoryGoodsSale"></line-echart>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useDashboardStore } from "@/store"
import { PieEchart, LineEchart, BarEchart } from "@/components/page-echart"

export default defineComponent({
  name: "dashboard",
  components: {
    PieEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const { dashboardStore, requestChartAction, requestAllCharts } =
      useDashboardStore()

    ;(async () => {
      await requestAllCharts()
    })()

    const categoryGoodsCount: any = computed(() => {
      const { pie } = dashboardStore
      return pie
    })

    // 获取当前12个月
    const getLastMonth = () => {
      let dataArr = [],
        data = new Date()
      data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
      for (let i = 0; i < 12; i++) {
        data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
        let m: any = data.getMonth() + 1
        m = m < 10 ? "0" + m : m
        dataArr.unshift(data.getFullYear() + "-" + m)
      }
      return dataArr
    }

    const categoryGoodsSale: any = computed(() => {
      const { line } = dashboardStore
      const values: any[] = []
      const xLabels = getLastMonth()

      for (const item of line) {
        const data = xLabels.map((k) => {
          if (k in item) return item[k]
          else return 0
        })

        values.push(data)
      }

      return {
        xLabels,
        values
      }
    })

    const categoryGoodsFavor: any = computed(() => {
      const { bar } = dashboardStore

      return {
        xLabels: bar.map((v: any) => v.title),
        values: bar.map((v: any) => v.count)
      }
    })

    return {
      categoryGoodsCount,
      categoryGoodsFavor,
      categoryGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  padding-top: 10px;
}
</style>
