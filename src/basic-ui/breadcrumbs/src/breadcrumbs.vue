<template>
  <div class="breadcrumbs">
    <el-breadcrumb separator=">">
      <template v-for="menu in pathMenus" :key="menu.name">
        <el-breadcrumb-item :to="menu.path">{{ menu.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import type { PropType } from "@vue/runtime-core"
import type { IBreadcrumb } from ".."

export default defineComponent({
  name: "Breadcrumbs",
  props: {
    pathMenus: {
      // props中设置具体类型需要通过PropType定义
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  }
})
</script>

<style scoped lang="less">
.breadcrumbs {
  margin-left: 20px;
  .el-breadcrumb {
    line-height: inherit;
  }
}
</style>
