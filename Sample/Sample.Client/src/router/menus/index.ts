import type { AppRouteRecordRaw } from '../types'
import type { RouteRecordRaw } from 'vue-router'
import { buildHierarchyTree, findPath } from '@/utils/tree'
// import { cloneDeep }

// Sort routes in ascending order of rank under meta in the route
export function ascending(arr: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  arr.forEach((v: AppRouteRecordRaw) => {
    if (v?.meta?.rank === null) v.meta.rank = undefined
    if (v?.meta?.rank === 0) {
      if (v.name !== 'Home' && v.path !== '/') {
        console.warn('rank only the home page can be 0')
      }
    }
  })
  return arr.sort((a: AppRouteRecordRaw, b: AppRouteRecordRaw) => {
    if (a?.meta?.rank === undefined) {
      return -1
    }
    if (b?.meta?.rank === undefined) {
      return 1
    }
    return a?.meta?.rank - b?.meta?.rank
  })
}

export function filterTree(arr: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  const newTree = arr.filter(
    (v: AppRouteRecordRaw) => v.meta?.showLink !== false
  )
  newTree.forEach(
    (v: AppRouteRecordRaw) =>
      v.children && (v.children = filterTree(v.children))
  )
  return newTree
}

/**
 * @description Process multi-level nested routes into one-dimensional arrays
 * @param routesList incoming route
 * @returns Returns the processed 1D route
 */
export function formatFlatteningRoutes(
  routesList: AppRouteRecordRaw[]
): AppRouteRecordRaw[] {
  if (routesList.length === 0) return routesList
  let hierarchyList: AppRouteRecordRaw[] = buildHierarchyTree(routesList)
  for (let i = 0; i < hierarchyList.length; i++) {
    const children = hierarchyList[i].children
    if (children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(children, hierarchyList.slice(i + 1))
    }
  }
  return hierarchyList
}

export function formatTwoStageRoutes(routesList: AppRouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  const newRoutesList: AppRouteRecordRaw[] = []
  routesList.forEach((v: AppRouteRecordRaw) => {
    if (v.path === '/') {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      })
    } else {
      if (newRoutesList[0] && newRoutesList[0].children) {
        newRoutesList[0].children.push({ ...v })
      }
    }
  })
  return newRoutesList
}

// Get parent path by path
export function getParentPaths(
  path: string,
  routes: readonly RouteRecordRaw[]
) {
  // Deep traversal search
  function dfs(
    routes: readonly RouteRecordRaw[],
    path: string,
    parents: string[]
  ) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i]
      // If the path is found, return the parent path
      if (item.path === path) return parents
      // no recursion if children does not exist or is empty
      if (!item.children || !item.children.length) continue
      // Push the current path to the stack when looking down
      parents.push(item.path)

      if (dfs(item.children, path, parents).length) return parents
      // The current path is popped from the stack when the depth traversal search is not found
      parents.pop()
    }
    // Returns empty array if not found
    return []
  }

  return dfs(routes, path, [])
}

export function findRouteByPath(
  path: string,
  routes: AppRouteRecordRaw[]
): Nullable<AppRouteRecordRaw> {
  const res = routes.find((item: { path: string }) => item.path == path)
  if (res) {
    return res
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i]?.children &&
        routes[i].children instanceof Array &&
        routes[i].children?.length > 0
      ) {
        const res = findRouteByPath(path, routes[i].children)
        if (res) {
          return res
        }
      }
    }
    return null
  }
}

export function getAllParentPath<T = Recordable>(
  treeData: readonly T[],
  path: string
) {
  const menuList = findPath(treeData, n => n.path === path) as RouteRecordRaw[]
  return (menuList || []).map(item => item.path)
}
