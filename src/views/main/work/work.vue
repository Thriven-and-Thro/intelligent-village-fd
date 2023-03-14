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
      ><template #name>新建事务</template>
      <template #content="scope">
        <el-link type="primary" @click="handleEditNote(scope.row)"
          >查看</el-link
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
  </div>
</template>

<script lang="ts" setup>
import { PageSearch } from "@/components/page-search"
import { PageContent } from "@/components/page-content"
import { PageModal } from "@/components/page-modal"
import { Note } from "@/components/note"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { usePageNote } from "@/hooks/use-page-note"

import contentTableConfig from "./config/content.config"
import searchFormConfig from "./config/search.config"
import modalConfig from "./config/modal.config"

const [pageContentRef, handleResetClick, handleQueryClick]: any =
  usePageSearch()

const [pageModalRef, defaultInfo, handleNewData, handleEditData]: any =
  usePageModal()

const [pageNoteRef, defaultnote, handleEditNote]: any = usePageNote()
</script>

<style scoped></style>
