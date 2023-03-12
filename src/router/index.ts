import { createRouter, createWebHashHistory } from "vue-router"
// 路由类型声明
// type 可加可不加，表示是类型声明
import type { RouteRecordRaw } from "vue-router"

import localCache from "@/utils/cache"

// 使用路由类型注解的数组
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
  },
  // 匹配不存在的路由至not-found
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  // 是否登录
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      // return 跳转
      return "/login"
    }
  }

  // /main默认到第一个路由
  if (to.path === "/main") {
    return "/main/feedback"
  }
})

export default router
