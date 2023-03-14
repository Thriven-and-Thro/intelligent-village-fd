<template>
  <div class="app">
    <div class="contain">
      <el-config-provider :locale="zhCn">
        <router-view />
      </el-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { ElConfigProvider } from "element-plus"
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
  .contain {
    margin: 0 auto;
    width: 100vw;
    height: 100%;
  }
}
</style>
