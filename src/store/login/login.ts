import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"

import localCache from "@/utils/cache"
import { mapMenusToRoutes } from "@/utils/map-menus"
import router from "@/router"

import { accountLoginRequest } from "@/service/login/login"
import userMenusConfig from "@/views/main/mapUserMenusConfig"

// 此处Module类型必须传递两个泛型，一个为当前state的类型，一个为根state的类型
const useLoginStore = defineStore("login", () => {
  const userToken = ref(""),
    userInfo = reactive({
      name: "",
      aid: 0
    }),
    // 用于生成菜单
    userMenus: any[] = reactive([])

  async function addMainRoute() {
    // 使用动态路由
    const routes = await mapMenusToRoutes()

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]

      if (router.hasRoute(route.name!)) break
      // 添加路由
      router.addRoute("main", route)
      // 添加菜单所需的一些属性
      userMenus.push({
        ...route,
        id: i,
        type: 2,
        url: route.path,
        ...userMenusConfig[i]
      })
    }
  }

  async function accountLoginAction(payload: any) {
    try {
      // 登录
      const loginResult = await accountLoginRequest(payload)

      const { aid, token, name } = loginResult

      userToken.value = token
      userInfo.name = name
      userInfo.aid = aid

      localCache.setCache("token", token)
      localCache.setCache("userInfo", userInfo)

      await addMainRoute()

      // 跳转至首页
      router.push("/main/feedback")
    } catch {
      ElMessage.error("账号或密码错误")
    }
  }
  // 加载localstorage到vuex
  function loadLocalLogin() {
    const token = localCache.getCache("token")
    if (token) {
      userToken.value = token
    }
  }

  return {
    userToken,
    userInfo,
    userMenus,
    accountLoginAction,
    loadLocalLogin,
    addMainRoute
  }
})

export default useLoginStore
