<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '64px' : '180px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="right-container">
        <el-header class="header">
          <nav-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <div class="main-main-bg">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import { NavMenu } from "@/components/nav-menu"
import { NavHeader } from "@/components/nav-header"

export default defineComponent({
  name: "Main",
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      handleFoldChange,
      isCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  .main-container {
    height: 100vh;
    .el-aside {
      border-right: 1px solid #dcdfe6;
    }
    .right-container {
      .header {
        height: 50px;
        border-bottom: 1px solid #dcdfe6;
        box-shadow: 0px 1px 5px hsl(0deg 0% 0% / 25%);
      }
    }
  }
}
</style>
