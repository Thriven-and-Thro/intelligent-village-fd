<template>
  <div class="page-content">
    <!-- 使用自定义组件 CfTable -->
    <cf-table
      :tableData="dataList"
      v-bind="contentTableConfig"
      :tableCount="dataCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick">
          <slot name="name">新建用户</slot>
        </el-button>
      </template>

      <!-- 普通作用域插槽 -->
      <!--
        在 CfTable 中插入一些通用的内容（使用 CfTable 提供的作用域插槽），
        使用 v-if 和配置信息控制是否显示。
        配置信息直接传入 CfTable，插入的内容中通过作用域插槽 scope 获得数据
      -->
      <!-- <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template> -->
      <!-- <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
      </template>
      <template #updateTime="scope">
        <span>{{ $filters.formatTime(scope.row.updateTime) }}</span>
      </template> -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-link type="primary" @click="handleEditClick(scope.row)"
            ><el-icon><Edit /></el-icon>编辑</el-link
          >
          <el-link type="primary" @click="handleDeleteClick(scope.row)"
            ><el-icon><Delete /></el-icon>删除</el-link
          >
        </div>
      </template>

      <!-- 再提供一个作用域插槽，使用者可以通过配置信息和作用域插槽插入额外的内容 -->
      <!-- 循环遍历出动态作用域插槽 -->
      <!-- 这里的作用域插槽是插入el-table中的 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 再添加一个插槽，是给父组件插入内容的 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </cf-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import { useMainStore } from "@/store"
import localCache from "@/utils/cache"

import { CfTable } from "@/basic-ui/table"
import { mapArticle } from "@/utils/map-article"

export default defineComponent({
  name: "PageContent",
  components: {
    CfTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const {
      deletePageDateAction,
      mainStore,
      searchPageListAction,
      pageListInfo
    } = useMainStore()

    const userInfo = localCache.getCache("userInfo")

    // 动态请求数据
    const getPageData = async (query: any = {}) => {
      await searchPageListAction({
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          limit: pageInfo.value.pageSize,
          aid: userInfo.aid,
          record: { ...query }
        }
      })
    }

    // 动态返回数据
    const dataList = computed(() => mainStore[`${props.pageName}List`])
    const dataCount = computed(() => mainStore[`${props.pageName}Count`])

    // 双向绑定分页器
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    watch(pageInfo, () => getPageData(pageListInfo.record))

    // 获取其他的动态插槽名
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false
        if (item.slotName === "handler") return false
        return true
      }
    )

    // 按钮
    const handleDeleteClick = async (item: any) => {
      let idName = `${props.pageName.slice(0, 3)}_id`
      if (props.pageName in mapArticle) idName = "art_id"

      await deletePageDateAction({
        pageName: props.pageName,
        id: item[idName]
      })
    }

    const handleNewClick = () => {
      emit("newBtnClick")
    }

    const handleEditClick = (item: any) => {
      emit("editBtnClick", item)
    }

    // 第一次进入调用
    getPageData()

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  display: flex;
  justify-content: space-around;
}
</style>
