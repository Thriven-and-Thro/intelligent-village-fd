const contentTableConfig = {
  title: "资产列表",
  propList: [
    { prop: "art_id", label: "资产ID", minWidth: "60" },
    { prop: "title", label: "标题", minWidth: "160" },
    { prop: "content", label: "内容摘要", minWidth: "160" },
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