import type { IForm } from "@/basic-ui/form"

const modalConfig: IForm = reactive({
  formItems: [
    {
      field: "content",
      type: "textarea",
      label: "内容",
      placeholder: "请输入内容",
      rules: [{ required: true, message: "内容不能为空" }]
    },
    {
      field: "user_id",
      type: "number",
      label: "发布者ID",
      placeholder: "请输入发布者ID",
      isHidden: true,
      rules: [
        {
          required: true,
          message: "发布者ID不能为空"
        },
        { type: "number", message: "ID必须是数字类型" }
      ]
    },
    {
      field: "area_reply",
      type: "textarea",
      label: "管理员回复",
      placeholder: "请输入管理员回复内容"
    },
    {
      field: "user_reply",
      type: "textarea",
      label: "反馈者评价",
      placeholder: "请输入反馈者评价内容"
    },
    {
      field: "state",
      type: "select",
      label: "状态",
      placeholder: "请选择状态",
      options: [
        {
          title: "未处理",
          value: 0
        },
        {
          title: "已处理",
          value: 1
        },
        {
          title: "拒绝处理",
          value: 2
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemLayout: {}
})

export default modalConfig
