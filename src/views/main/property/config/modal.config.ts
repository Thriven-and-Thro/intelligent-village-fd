import type { IForm } from "@/basic-ui/form"

const modalConfig: IForm = reactive({
  formItems: [
    {
      field: "title",
      type: "input",
      label: "标题",
      placeholder: "请输入标题",
      rules: [{ required: true, message: "标题不能为空" }]
    },
    {
      field: "content",
      type: "textarea",
      label: "内容",
      placeholder: "请输入内容",
      rules: [{ required: true, message: "内容不能为空" }]
    }
  ],
  colLayout: { span: 24 },
  itemLayout: {}
})

export default modalConfig
