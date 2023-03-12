<template>
  <div class="nav-menu">
    <div class="nav-menu-header" v-if="!collapse">
      <img src="@/assets/img/村庄规划.svg" class="nav-menu-header-img" />
      <span>智慧村庄</span>
    </div>
    <div class="nav-menu-header-popper" v-if="collapse"></div>
    <!-- 可以插入template -->
    <el-menu
      :default-active="'0'"
      :unique-opened="true"
      :collapse="collapse"
      :collapse-transition="false"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 2">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <el-icon :size="20"
              ><component :is="item.icon"></component
            ></el-icon>
            <span class="menu-item-title">{{ item.chinaName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import router from "@/router"
import { useLoginStore } from "@/store"

export default defineComponent({
  name: "NavMenu",
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 路由跳转
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found"
      })
    }

    const { userMenus } = useLoginStore()

    return {
      handleMenuItemClick,
      userMenus
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  .nav-menu-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    line-height: 75px;
    font-weight: 700;
    font-size: 25px;
    .nav-menu-header-img {
      height: 45px;
    }
  }
  .nav-menu-header-popper {
    height: 50px;
  }
  .el-menu {
    border: 0;

    .el-menu-item {
      justify-content: flex-end;

      .menu-item-title {
        width: 65%;
      }

      &:hover {
        font-weight: 700;
        background-color: #fff;
      }
    }

    .el-menu-item.is-active {
      color: #fff;
      font-weight: 700;
      background-color: #435cef;
      border-radius: 20px;
      box-shadow: 0px 5px 0 0 #2f44b9, 0 7px 5px 0 rgb(0 0 0 / 50%);
      z-index: 999;
    }
  }
}
</style>
