// element-plus 的表单验证是使用库 async-validator
export const ruleAccount = {
  account: [
    {
      required: true,
      message: "必须输入地区",
      // 离开焦点时验证
      trigger: "blur"
    }
  ],
  pass: [
    {
      required: true,
      message: "必须输入密码",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码为3位以上字母或数字",
      trigger: "blur"
    }
  ]
}
