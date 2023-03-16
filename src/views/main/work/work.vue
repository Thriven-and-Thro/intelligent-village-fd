<template>
  <div class="work">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleQueryClick($event)"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="work"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @batchRemoveClick="handleBatchRemoveClick"
      ><template #name>新建事务</template>
      <template #content="scope">
        <el-link type="primary" @click="handleEditNote(scope.row)"
          >查看详情</el-link
        >
      </template>
      <template #comment="scope">
        <el-link type="primary" @click="handleEditComment(scope.row.art_id)"
          >查看评论</el-link
        >
      </template>
    </page-content>
    <page-modal
      title="编辑事务"
      :modalConfig="modalConfig"
      page-name="work"
      ref="pageModalRef"
      :default-info="defaultInfo"
    ></page-modal>
    <note
      :modalConfig="modalConfig"
      page-name="property"
      ref="pageNoteRef"
      :default-info="defaultnote"
    ></note>
    <comment
      ref="pageCommentRef"
      page-name="comment"
      @batchRemoveClick="handleBatchRemoveClick"
    ></comment>
  </div>
</template>

<script lang="ts" setup>
import { PageSearch } from "@/components/page-search"
import { PageContent } from "@/components/page-content"
import { PageModal } from "@/components/page-modal"
import { Note } from "@/components/note"
import { Comment } from "@/components/comment"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { usePageNote } from "@/hooks/use-page-note"
import { usePageComment } from "@/hooks/use-page-comment"
import { usePageContent } from "@/hooks/use-page-content"

import contentTableConfig from "./config/content.config"
import searchFormConfig from "./config/search.config"
import modalConfig from "./config/modal.config"

const [pageContentRef, handleResetClick, handleQueryClick]: any =
  usePageSearch()

const [pageModalRef, defaultInfo, handleNewData, handleEditData]: any =
  usePageModal()

const [pageNoteRef, defaultnote, handleEditNote]: any = usePageNote()

const [pageCommentRef, handleEditComment]: any = usePageComment()

const [handleBatchRemoveClick]: any = usePageContent()
</script>

<style scoped></style>
