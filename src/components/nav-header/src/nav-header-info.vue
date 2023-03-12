<template>
  <div class="nav-header-info">
    <el-dropdown>
      <span class="header-info-right">
        <span>{{ userInfo.name }}</span>
        <el-icon><ArrowDownBold /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import localCache from "@/utils/cache"

const userInfo = localCache.getCache("userInfo")

const handleExitClick = () => {
  localCache.deleteCache("token")
  router.push("/login")
}
</script>

<style scoped lang="less">
.nav-header-info {
  &:deep(.el-dropdown) {
    height: 100%;
    .header-info-right {
      display: flex;
      align-items: center;
      height: 100%;
      .info-right-avatar {
        margin: 0 10px;
      }
    }
  }
}
</style>
