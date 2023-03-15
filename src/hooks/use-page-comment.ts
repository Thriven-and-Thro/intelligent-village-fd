import { ref } from "vue"

// 根据新建或编辑为弹窗表单赋值
// 传入两个参数函数是给隐藏指定行的函数预留的
export function usePageComment() {
  const pageCommentRef = ref()

  const handleEditComment = (item: any) => {
    if (pageCommentRef.value) {
      pageCommentRef.value.dialogVisible = true
      pageCommentRef.value.getCommentData({}, item)
    }
  }

  return [pageCommentRef, handleEditComment]
}
