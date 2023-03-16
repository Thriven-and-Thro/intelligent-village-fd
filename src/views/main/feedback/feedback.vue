<template>
  <div class="feedback">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleQueryClick($event)"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="feedback"
      ref="pageContentRef"
      @editBtnClick="handleEditData"
      @batchRemoveClick="handleBatchRemoveClick"
    >
      <template #newHandler>
        <span></span>
      </template>
      <!-- 插入状态插槽 -->
      <template #state="scope">
        <el-tag :type="statusTag(scope.row.state)">{{
          statusTitle(scope.row.state)
        }}</el-tag>
      </template>
    </page-content>
    <page-modal
      title="编辑反馈"
      :modalConfig="modalConfig"
      page-name="feedback"
      ref="pageModalRef"
      :default-info="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { PageSearch } from "@/components/page-search"
import { PageContent } from "@/components/page-content"
import { PageModal } from "@/components/page-modal"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { usePageContent } from "@/hooks/use-page-content"

import contentTableConfig from "./config/content.config"
import searchFormConfig from "./config/search.config"
import modalConfig from "./config/modal.config"

const [pageContentRef, handleResetClick, handleQueryClick]: any =
  usePageSearch()

const [pageModalRef, defaultInfo, _, handleEditData]: any = usePageModal()

const [handleBatchRemoveClick]: any = usePageContent()

const statusTitle = (value: number) => {
  switch (value) {
    case 0:
      return "未处理"
    case 1:
      return "已处理"
    case 2:
      return "拒绝处理"
    default:
      return "状态错误"
  }
}

const statusTag = (value: number) => {
  switch (value) {
    case 0:
      return "info"
    case 1:
      return "success"
    case 2:
      return "danger"
    default:
      return "warning"
  }
}

// 监听状态改变时展示/隐藏管理员回复
watchEffect(() => {
  if (pageModalRef.value?.formData?.state > 0) {
    modalConfig.formItems[4].isHidden = false
  } else {
    modalConfig.formItems[4].isHidden = true
  }
})
</script>

<style scoped></style>
