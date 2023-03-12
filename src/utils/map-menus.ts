// 动态路由
// 导入路由类型
import type { RouteRecordRaw } from "vue-router"

import type { IBreadcrumb } from "@/basic-ui/breadcrumbs"

// 根据参数获取路由表及第一个路由
export async function mapMenusToRoutes(): Promise<RouteRecordRaw[]> {
  const routes: RouteRecordRaw[] = []

  // vite进行文件导入
  // 格式为 {"src/router/main/feedback/feedback.ts": ()=>import(src/router/main/feedback/feedback.ts)}
  const routeFiles = import.meta.glob("../router/main/*/*.ts")

  for (const item in routeFiles) {
    const route: any = await routeFiles[item]()
    routes.push(route.default)
  }

  return routes
}

// 获取当前路径面包屑
export function pathMapBreadcrumbs(userMenu: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenu, currentPath, breadcrumbs)
  return breadcrumbs
}

// 根据currentPath找该路由信息
// 可传入参数3：获取当前路径以上层级作为面包屑
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.path })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取用户路由权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

// 获得权限树中的叶子节点
export function getMenuLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}
