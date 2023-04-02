<template>
  <div class="pie-echart">
    <cf-echart :options="options" title="事务数量分布情况"> </cf-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue"
import { CfEchart } from "@/basic-ui/echart"
import type { IDataType } from "./type"

const props = defineProps<{
  pieData: IDataType
}>()

const options: any = computed(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left",
      testStyle: {
        color: "#dddddd"
      }
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: {
          color: "#ddd"
        }
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
