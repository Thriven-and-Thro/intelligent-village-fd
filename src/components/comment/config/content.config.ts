const contentTableConfig = {
  title: "评论列表",
  propList: [
    { prop: "com_id", label: "评论ID", minWidth: "60" },
    { prop: "content", label: "详情", minWidth: "280", slotName: "content" },
    { prop: "user_id", label: "发布者ID", minWidth: "90" },
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
