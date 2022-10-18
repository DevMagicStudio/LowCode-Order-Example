import { isEmpty, isArray } from 'lodash-es'

interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config)

/**
 * @description Create a hierarchy
 * @param menuTree
 * @param pathList
 * @returns
 */
export function buildHierarchyTree(menuTree: any[], pathList = []): any[] {
  if (isEmpty(menuTree)) return []
  if (!isArray(menuTree)) {
    return []
  }
  for (const [key, node] of menuTree.entries()) {
    node.id = key
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null
    node.pathList = [...pathList, node.id]
    if (!isEmpty(node.children)) {
      buildHierarchyTree(node.children, node.pathList)
    }
  }
  return menuTree
}

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {}
): T | T[] | null {
  config = getConfig(config)
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}
