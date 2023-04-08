import { defineStore } from "pinia"

import localCache from "@/utils/cache"

import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from "@/service/main/main"

import formatTime from "@/global/register-properties"
import { searchPageListData } from "@/service/main/search"
import { mapArticle } from "@/utils/map-article"

const useMainStore = defineStore("main", () => {
  // 建立对象是为了方便动态获取、写入数据
  const mainStore: Record<string, any> = reactive({
    feedbackList: [],
    feedbackCount: 0,
    partyWorkList: [],
    partyWorkCount: 0,
    villageWorkList: [],
    villageWorkCount: 0,
    propertyList: [],
    propertyCount: 0,
    projectList: [],
    projectCount: 0,
    commentList: [],
    commentCount: 0
  })

  const pageListInfo = reactive({
    offset: 0,
    limit: 10,
    record: {}
  })

  // 动态写入
  function setStoreList(name: string, data: any[]) {
    mainStore[`${name}List`] = data
  }

  function setStoreCount(name: string, count: number) {
    mainStore[`${name}Count`] = count
  }

  function dataOpt(pageName: string, pageResult: any) {
    const data = pageResult[0].data

    for (const item of data) {
      if ("updateTime" in item) {
        item.updateTime = formatTime(item.updateTime)
      }
    }

    // 计入store
    setStoreList(pageName, data)
    setStoreCount(pageName, pageResult[0].count)
  }

  // 处理pageName
  function pageNameOpt(payload: any, requestData?: any) {
    // 动态获取请求信息
    let pageName = payload.pageName

    // article页面的特殊处理
    if (pageName in mapArticle) {
      pageName = "article"
      if (requestData) requestData.type = mapArticle[payload.pageName]
    }

    return pageName
  }

  // 模糊搜索
  async function searchPageListAction(payload: any) {
    // 发送的请求体
    const requestData = {
      ...payload.queryInfo
    }

    const pageName = pageNameOpt(payload, requestData)

    const lastQueryInfoRecord: any = {},
      queryInfoRecord = payload.queryInfo.record

    // 对时间进行处理
    for (const key in queryInfoRecord) {
      if (key === "updateTime") {
        lastQueryInfoRecord.updateTime = [
          queryInfoRecord.updateTime[0] + " 00:00:00",
          queryInfoRecord.updateTime[1] + " 23:59:59"
        ]
        // 对搜索框的空格进行处理
      } else if (
        typeof queryInfoRecord[key] === "string" &&
        queryInfoRecord[key].trim().length !== 0
      )
        lastQueryInfoRecord[key] = queryInfoRecord[key].trim()
      else lastQueryInfoRecord[key] = queryInfoRecord[key]
    }

    payload.queryInfo.record = lastQueryInfoRecord

    const aid = localCache.getCache("userInfo").aid

    const pageResult = await searchPageListData({
      table: pageName,
      aid,
      ...requestData
    })

    pageListInfo.record = lastQueryInfoRecord

    dataOpt(payload.pageName, pageResult)
  }

  async function againRequestPageData(pageName: string, query: any = {}) {
    const aid = localCache.getCache("userInfo").aid

    await searchPageListAction({
      pageName,
      queryInfo: {
        offset: pageListInfo.offset,
        limit: pageListInfo.limit,
        aid,
        record: pageListInfo.record,
        ...query
      }
    })
  }

  // 删除
  async function deletePageDateAction(payload: any, query: any = {}) {
    const { id } = payload
    const pageName = pageNameOpt(payload)
    const pageUrl = `/${pageName}/${id}`

    await deletePageData(pageUrl)

    // 重新请求
    await againRequestPageData(payload.pageName, query)
  }

  // 创建
  async function createPageDataAction(payload: any) {
    const pageName = pageNameOpt(payload)
    const { newData } = payload
    const pageUrl = `/${pageName}`

    for (const key in newData) {
      if (/_id/.test(key)) {
        newData[key] = Number(newData[key])
      }
    }

    const aid = localCache.getCache("userInfo").aid

    await createPageData(pageUrl, {
      ...newData,
      aid,
      type: mapArticle[payload.pageName]
    })

    // 重新请求
    await againRequestPageData(payload.pageName)
  }

  // 编辑
  async function editPageDataAction(payload: any) {
    const pageName = pageNameOpt(payload)
    const { editData, id } = payload
    const pageUrl = `/${pageName}/${id}`

    for (const key in editData) {
      if (/_id/.test(key)) {
        editData[key] = Number(editData[key])
      }
    }

    await editPageData(pageUrl, {
      ...editData,
      type: mapArticle[payload.pageName]
    })

    // 重新请求
    await againRequestPageData(payload.pageName)
  }

  return {
    mainStore,
    pageListInfo,

    againRequestPageData,
    deletePageDateAction,
    createPageDataAction,
    editPageDataAction,
    searchPageListAction
  }
})

export default useMainStore
