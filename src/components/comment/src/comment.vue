<template>
  <div class="comment">
    <el-dialog
      v-model="dialogVisible"
      width="80%"
      center
      class="dialog"
      title="评论列表"
    >
      <cf-table
        :tableData="dataList"
        v-bind="contentTableConfig"
        :tableCount="dataCount"
        v-model:page="pageInfo"
        @selectionChange="handleSelectChange"
      >
        <template #header>
          <div class="comment-header">
            <div class="comment-header-input">
              <el-input
                v-model="input1"
                class="w-50 m-2 header-search"
                placeholder="请输入评论内容"
                clearable
              />
              <el-input
                v-model="input2"
                class="w-50 m-2 header-search"
                placeholder="请输入发布者ID"
                clearable
              />
            </div>

            <div class="comment-header-button">
              <el-button type="primary" round @click="searchComment"
                >搜索</el-button
              >
              <el-button type="danger" round @click="handleBatchRemoveClick"
                >批量删除</el-button
              >
            </div>
          </div>
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <el-link type="primary" @click="handleDeleteClick(scope.row)"
              ><el-icon><Delete /></el-icon>删除</el-link
            >
          </div>
        </template>
      </cf-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { CfTable } from "@/basic-ui/table"
import { useMainStore } from "@/store"
import localCache from "@/utils/cache"

import contentTableConfig from "../config/content.config"

const dialogVisible = ref(false)

const props = defineProps({
  pageName: String
})

const { deletePageDateAction, mainStore, searchPageListAction, pageListInfo } =
  useMainStore()

// 动态返回数据
const dataList = computed(() => mainStore[`${props.pageName}List`])
const dataCount = computed(() => mainStore[`${props.pageName}Count`])

// 查询
const userInfo = localCache.getCache("userInfo")
const artId = ref(0)
const getCommentData = async (record: any = {}, art_id?: number) => {
  if (typeof art_id === "number") artId.value = art_id

  await searchPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      limit: pageInfo.value.pageSize,
      aid: userInfo.aid,
      record: { ...record },
      art_id: artId.value
    }
  })
}

// 双向绑定分页器
const pageInfo = ref({ currentPage: 1, pageSize: 10 })

watch(pageInfo, () => getCommentData(pageListInfo.record))

// 删除按钮
const handleDeleteClick = async (item: any) => {
  let idName = `com_id`

  await deletePageDateAction(
    {
      pageName: props.pageName,
      id: item[idName]
    },
    {
      art_id: artId.value
    }
  )
}

const input1 = ref("")
const input2 = ref("")

// 搜索
const searchComment = () => {
  getCommentData({
    content: input1.value,
    user_id: input2.value
  })
}

// 记录选中
const deleteitems = ref<any>([])

// 监听选择框
const handleSelectChange = (items: any[]) => {
  if (items.length !== 0) {
    deleteitems.value = items
  }
}

const emits = defineEmits(["batchRemoveClick"])

const handleBatchRemoveClick = () => {
  emits("batchRemoveClick", deleteitems.value, props.pageName)
}

defineExpose({
  dialogVisible,
  getCommentData
})
</script>

<style scoped lang="less">
.comment {
  :deep(.dialog) {
    border-radius: 25px;

    .el-dialog__body {
      padding: 0;

      .cf-table {
        margin-top: 0;
        box-shadow: none;
      }
    }
  }
  .header-search {
    width: 30%;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .comment-header-input {
      flex: 0 1 50%;
      .el-input {
        width: 45%;
        padding-right: 10px;
      }
    }
  }
}
</style>
