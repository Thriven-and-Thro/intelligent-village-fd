<template>
  <div class="bar-echart">
    <cf-echart :options="options" title="文章数量分布情况"></cf-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue"
import * as echarts from "echarts"

import { CfEchart } from "@/basic-ui/echart"

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()

const options: any = computed(() => {
  return {
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: false,
        color: "#999"
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#999"
      }
    },
    dataZoom: [
      {
        type: "inside"
      }
    ],
    tooltip: {
      show: true
    },
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#E01F54" },
            { offset: 1, color: "#C1232B" }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#C1232B" },
              { offset: 1, color: "#E01F54" }
            ])
          }
        },
        data: props.values
      }
    ],
    // 无障碍
    aria: {
      enabled: true,
      decal: {
        show: true
      }
    }
  }
})
</script>
