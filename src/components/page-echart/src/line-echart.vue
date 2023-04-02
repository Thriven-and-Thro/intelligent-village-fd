<template>
  <div class="line-echart">
    <cf-echart :options="options" title="反馈处理情况"> </cf-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue"
import { CfEchart } from "@/basic-ui/echart"

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()

const options: any = computed(() => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: "value"
    },
    series: [
      { name: "待处理", data: props.values[0], type: "line" },
      {
        name: "已处理",
        data: props.values[1],
        type: "line"
      },
      {
        name: "拒绝处理",
        data: props.values[2],
        type: "line"
      }
    ],
    tooltip: {
      trigger: "axis"
    },
    legend: {},
    dataZoom: [
      {
        startValue: new Date().getFullYear() - 1 + "-01"
      },
      {
        type: "inside"
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
