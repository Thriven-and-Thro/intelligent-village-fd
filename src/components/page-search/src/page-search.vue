<template>
  <div class="page-search">
    <cf-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </cf-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import { CfForm } from "@/basic-ui/form"

export default defineComponent({
  name: "PageSearch",
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    CfForm
  },
  emits: ["resetBtnClick", "searchBtnClick"],
  setup(props, { emit }) {
    // 动态获取
    const formItem = props.searchFormConfig?.formItem ?? []
    const formOriginData: any = {}
    for (const item of formItem) {
      formOriginData[item.field] = ""
    }
    const formData = ref(formOriginData)

    // 重置按钮
    const handleResetClick = () => {
      formData.value = formOriginData
      emit("resetBtnClick")
    }

    // 搜索按钮
    const handleQueryClick = () => {
      emit("searchBtnClick", formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  padding-right: 30px;
  border-radius: 20px;
  box-shadow: 0px 1px 5px hsl(0deg 0% 0% / 25%);
}
.handle-btns {
  flex: 1;
  padding-bottom: 20px;
  text-align: center;
}
</style>
