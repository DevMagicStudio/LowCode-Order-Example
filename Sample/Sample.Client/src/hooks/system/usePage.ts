import { useGo } from '../web/usePage'


export function usePage() {
  const go = useGo()
  function goPageQuery(path: string, item?: any) {
    const opt = item ? { path, query: { item: encodeURIComponent(JSON.stringify(item)) } } : { path }
    go(opt)
  }

  return {
    goPageQuery
  }
}
