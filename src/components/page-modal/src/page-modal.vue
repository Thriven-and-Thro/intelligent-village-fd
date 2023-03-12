<template>
  <div class="page-modal">
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="50%"
      center
      class="dialog"
    >
      <cf-form
        v-bind="modalConfig"
        v-model="formData"
        ref="cfFormRef"
      ></cf-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick()"
            >确定</el-button
          >
        </span>
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core"

import { CfForm } from "@/basic-ui/form"
import { useMainStore } from "@/store"
import { ElMessage } from "element-plus"

export default defineComponent({
  name: "PageModal",
  components: {
    CfForm
  },
  props: {
    title: {
      type: String,
      require: true
    },
    modalConfig: {
      type: Object,
      require: true
    },
    // 初始表单数据
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    // 用来传递其他数据，例如role页面
    otherInfo: {
      type: Object,
      dafault: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const { editPageDataAction, createPageDataAction } = useMainStore()
    // 是否显示弹窗
    const dialogVisible = ref(false)
    // 表单数据
    const formData = ref<any>({})

    // 数据变化填充新数据
    watch(
      // 不要直接监听props中的数据，
      // 但是这个是个对象，其中属性值发生改变时依然监听得到
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const cfFormRef = ref()

    // 点击确定
    const handleConfirmClick = async () => {
      cfFormRef.value.formRef?.validate((valid: boolean, messages: any) => {
        if (!valid) {
          const mes = Object.keys(messages)[0]

          ElMessage.error(messages[mes][0].message)
          return false
        }
      })

      dialogVisible.value = false
      // 编辑
      if (Object.keys(props.defaultInfo).length) {
        await editPageDataAction({
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo[`${props.pageName?.slice(0, 3)}_id`]
        })
        // 新建
      } else {
        await createPageDataAction({
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      cfFormRef,
      handleConfirmClick
    }
  }
})
</script>

<style scoped lang="less">
:deep(.dialog) {
  border-radius: 25px;
}
</style>
