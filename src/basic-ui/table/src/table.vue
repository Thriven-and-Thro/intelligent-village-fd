<template>
  <div class="cf-table">
    <!-- 表格头部 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <!-- 表格主体 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 是否添加选中框 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="42"
      >
      </el-table-column>
      -->
      <!-- 是否添加序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="59"
      >
      </el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <!-- 使用el-table-column的作用域插槽，通过scope.row可以获取到本行的数据 -->
          <template #default="scope">
            <!-- 使用作用域插槽，传递数据给父组件 -->
            <!-- 这个组件接受的配置信息通过这里向 PageContent 中插入内容 -->
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 表格尾部 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 15]"
          v-model:page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-if="showFooter"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core"
import type { PropType } from "@vue/runtime-core"

import { useMainStore } from "@/store"

export default defineComponent({
  name: "CfTable",
  props: {
    title: {
      type: String,
      default: ""
    },
    tableData: {
      type: Array,
      required: true
    },
    tableCount: {
      type: Number,
      required: true,
      default: 0
    },
    propList: {
      type: Array as PropType<any[]>
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    // 分页器数据
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    // 菜单是否分层
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value)
    }

    // 分页器
    const currentPage = ref(1)
    const pageSize = ref(10)

    const { pageListInfo } = useMainStore()

    const handleCurrentChange = (currentPage: number) => {
      pageListInfo.offset = (currentPage - 1) * pageSize.value
      emit("update:page", { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      pageListInfo.limit = pageSize
      emit("update:page", { ...props.page, pageSize })
    }

    return {
      handleSelectionChange,
      currentPage,
      pageSize,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.cf-table {
  margin-top: 20px;
  padding: 0 10px;
  border-radius: 20px;

  box-shadow: 0px 1px 5px hsl(0deg 0% 0% / 25%);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }

  :deep(tbody) .cell {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .footer {
    padding: 20px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
