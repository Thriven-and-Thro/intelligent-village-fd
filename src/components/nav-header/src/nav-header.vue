<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><component :is="isFold ? 'Fold' : 'Expand'"></component
    ></el-icon>
    <div class="header-main">
      <nav-header-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import NavHeaderInfo from "./nav-header-info.vue"
import Breadcrumbs from "@/basic-ui/breadcrumbs/src/breadcrumbs.vue"

export default defineComponent({
  name: "NavHeader",
  components: {
    NavHeaderInfo,
    Breadcrumbs
  },
  // 侧边栏的缩放
  emits: ["foldChange"],
  setup(props, { emit }) {
    // 侧边栏的缩放
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;
  height: 100%;
  line-height: 60px;
  .fold-menu {
    margin-right: 10px;
    font-size: 30px;
    cursor: pointer;
    color: #555;
    line-height: 60px;
  }
  .header-main {
    display: flex;
  }
}
</style>
