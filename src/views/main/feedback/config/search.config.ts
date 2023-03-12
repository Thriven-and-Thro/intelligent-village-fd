import type { IForm } from "@/basic-ui/form"

const searchFormConfig: IForm = {
  labelWidth: "120px",
  itemLayout: {
    padding: "10px 40px"
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: "user_id",
      type: "input",
      label: "发布者ID",
      placeholder: "请输入发布者ID"
    },
    {
      field: "content",
      type: "input",
      label: "内容",
      placeholder: "请输入内容"
    },
    {
      field: "area_reply",
      type: "input",
      label: "管理员回复",
      placeholder: "请输入管理员回复"
    },
    {
      field: "user_reply",
      type: "input",
      label: "反馈者评价",
      placeholder: "请输入反馈者评价"
    },
    {
      field: "updateTime",
      type: "datepicker",
      label: "更新时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
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
  ]
}

export default searchFormConfig
