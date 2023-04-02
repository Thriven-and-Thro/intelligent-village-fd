import { ref } from "vue"

// 根据新建或编辑为弹窗表单赋值
// 传入两个参数函数是给隐藏指定行的函数预留的
export function usePageNote() {
  const pageNoteRef = ref()
  const defaultnote = ref({})

  const handleEditNote = (item: any) => {
    defaultnote.value = { ...item }

    if (pageNoteRef.value) {
      pageNoteRef.value.dialogVisible = true
    }
  }

  return [pageNoteRef, defaultnote, handleEditNote]
}
