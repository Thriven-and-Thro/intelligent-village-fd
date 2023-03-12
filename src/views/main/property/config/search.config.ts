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
      field: "title",
      type: "input",
      label: "标题",
      placeholder: "请输入标题"
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
    }
  ]
}

export default searchFormConfig
