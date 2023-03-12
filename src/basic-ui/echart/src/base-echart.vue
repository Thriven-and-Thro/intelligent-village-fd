<template>
  <div class="base-echart">
    <cf-card :title="title">
      <div
        class="echartRef"
        ref="echartRef"
        :style="{ width: 'width', height: 'height' }"
      ></div>
    </cf-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, defineProps, watchEffect } from "vue"
import { EChartsOption } from "echarts"

import { CfCard } from "@/basic-ui/card"
import useEchart from "@/hooks/useEchart"

// 使用defineProps定义props。
// defineProps可以传递一个泛型，则不需要传参数并且可以定义ts的类型
// 若defineProps不传递一个泛型，则需要传参数对象并且类型定义是普通的vue形式
// defineProps({
//   width: String,
//   height: String
// }),
// 使用withDefaults在参数2设置默认值对象
// 通过返回值在逻辑代码中调用props
const props = withDefaults(
  defineProps<{
    // 配置的类型
    options: EChartsOption
    title: string
    width?: string
    height?: string
  }>(),
  {
    width: "100%",
    height: "360px"
  }
)

const echartRef = ref<HTMLElement>()
// 在setup中模板还没加载完，此处拿不到ref的值
// 应该在onMounted生命周期函数中调用
onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)
  // 监听数据实时变化
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less">
.echartRef {
  width: 100%;
  height: 360px;
}
</style>
