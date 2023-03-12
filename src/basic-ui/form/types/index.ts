type IFormType =
  | "input"
  | "password"
  | "select"
  | "datepicker"
  | "textarea"
  | "number"

export interface IFormItem {
  // 给v-model匹配formData
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 用于select
  options?: any
  // 用于特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}
