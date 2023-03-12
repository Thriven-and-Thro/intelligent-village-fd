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

const useMainStore = defineStore("main", () => {
  // 建立对象是为了方便动态获取、写入数据
  const mainStore: Record<string, any> = reactive({
    feedbackList: [],
    feedbackCount: 0,
    workList: [],
    workCount: 0,
    propertyList: [],
    propertyCount: 0,
    projectList: [],
    projectCount: 0
  })

  const pageListInfo = reactive({
    offset: 0,
    limit: 10,
    record: {}
  })

  const aid = localCache.getCache("userInfo").aid

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

  // 模糊搜索
  async function searchPageListAction(payload: any) {
    // 动态获取请求信息
    const pageName = payload.pageName

    const lastQueryInfoRecord: any = {},
      queryInfoRecord = payload.queryInfo.record

    for (const key in queryInfoRecord) {
      // 对时间进行处理
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
    console.log(payload.queryInfo.record)

    // 发送请求
    const pageResult = await searchPageListData({
      table: pageName,
      ...payload.queryInfo
    })

    pageListInfo.record = lastQueryInfoRecord
    dataOpt(pageName, pageResult)
  }

  async function againRequestPageData(pageName: string) {
    await searchPageListAction({
      pageName,
      queryInfo: {
        offset: pageListInfo.offset,
        limit: pageListInfo.limit,
        aid: aid,
        record: pageListInfo.record
      }
    })
  }

  // 删除
  async function deletePageDateAction(payload: any) {
    const { pageName, id } = payload
    const pageUrl = `/${pageName}/${id}`

    await deletePageData(pageUrl)

    // 重新请求
    await againRequestPageData(pageName)
  }

  // 创建
  async function createPageDataAction(payload: any) {
    const { pageName, newData } = payload
    const pageUrl = `/${pageName}`

    for (const key in newData) {
      if (/_id/.test(key)) {
        newData[key] = Number(newData[key])
      }
    }

    await createPageData(pageUrl, { ...newData, aid })

    // 重新请求
    await againRequestPageData(pageName)
  }

  // 编辑
  async function editPageDataAction(payload: any) {
    const { pageName, editData, id } = payload
    const pageUrl = `/${pageName}/${id}`

    for (const key in editData) {
      if (/_id/.test(key)) {
        editData[key] = Number(editData[key])
      }
    }

    await editPageData(pageUrl, editData)

    // 重新请求
    await againRequestPageData(pageName)
  }

  return {
    mainStore,
    pageListInfo,

    deletePageDateAction,
    createPageDataAction,
    editPageDataAction,
    searchPageListAction
  }
})

export default useMainStore
