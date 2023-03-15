import { batchRemovePageData } from "@/service/main/batchRemove"
import { useMainStore } from "@/store"
import { mapArticle } from "@/utils/map-article"

export function usePageContent() {
  // 批量删除
  const handleBatchRemoveClick = async (
    deleteitems: any[],
    pageName: string
  ) => {
    // 不能直接修改pageName，因为pageName在againRequestPageData中做了特殊处理
    let table = pageName
    if (pageName in mapArticle) {
      table = "article"
    }

    await batchRemovePageData({
      table,
      items: deleteitems.map((v) => {
        return v[`${table.slice(0, 3)}_id`]
      })
    })

    const { againRequestPageData } = useMainStore()
    againRequestPageData(pageName)
  }

  return [handleBatchRemoveClick]
}
