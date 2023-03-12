const contentTableConfig = {
  title: "反馈列表",
  propList: [
    { prop: "fee_id", label: "反馈ID", minWidth: "60" },
    { prop: "content", label: "内容摘要", minWidth: "100" },
    { prop: "user_id", label: "发布者ID", minWidth: "90" },
    { prop: "area_reply", label: "管理员回复", minWidth: "100" },
    { prop: "user_reply", label: "反馈者评价", minWidth: "100" },
    { prop: "state", label: "状态", minWidth: "100", slotName: "state" },
    {
      prop: "updateTime",
      label: "更新时间",
      minWidth: "160",
      slotName: "updateTime"
    },
    { label: "操作", minWidth: "120", slotName: "handler" }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showFooter: true
}

export default contentTableConfig
