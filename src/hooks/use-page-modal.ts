import { ref } from "vue"
import type { PageModal } from "@/components/page-modal"

// 通过回调函数的参数能够在传入回调函数的地方拿到次函数里的值
type CallbackFn = (item?: any) => void

// 根据新建或编辑为弹窗表单赋值
// 传入两个参数函数是给隐藏指定行的函数预留的
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    // 存在方法则表示需要执行隐藏
    newCb && newCb()

    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  const handleEditData = (item: any) => {
    // 传入的回调函数拿到item
    editCb && editCb(item)

    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
