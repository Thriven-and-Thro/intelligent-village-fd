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
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      ><template #name>新建反馈</template>
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

import contentTableConfig from "./config/content.config"
import searchFormConfig from "./config/search.config"
import modalConfig from "./config/modal.config"

const [pageContentRef, handleResetClick, handleQueryClick]: any =
  usePageSearch()

// 根据按钮不同修改弹窗对应输入框是否隐藏
const newCallback = () => {
  modalConfig.formItems[1].isHidden = false
}

const editCallback = () => {
  modalConfig.formItems[1].isHidden = true
}

const [pageModalRef, defaultInfo, handleNewData, handleEditData]: any =
  usePageModal(newCallback, editCallback)

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
</script>

<style scoped></style>
