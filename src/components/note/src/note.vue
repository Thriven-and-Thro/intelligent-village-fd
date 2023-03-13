<template>
  <div class="note">
    <el-dialog v-model="dialogVisible" width="80%" center class="dialog">
      <CfSummernote
        @summernoteInput="logSummernoteInput"
        :value="defaultInfo.content"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick()"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core"

import { useMainStore } from "@/store"

import { CfSummernote } from "@/basic-ui/summernote"

export default defineComponent({
  name: "Note",
  components: {
    CfSummernote
  },
  props: {
    pageName: {
      type: String,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    modalConfig: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    const { editPageDataAction } = useMainStore()
    // 是否显示弹窗
    const dialogVisible = ref(false)
    const formData: any = reactive({})

    const logSummernoteInput = (value: any) => {
      formData.content = value
    }

    watch(
      // 不要直接监听props中的数据，
      // 但是这个是个对象，其中属性值发生改变时依然监听得到
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig?.formItems) {
          formData[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定
    const handleConfirmClick = async () => {
      dialogVisible.value = false
      console.log(formData)

      await editPageDataAction({
        pageName: props.pageName,
        editData: { ...formData },
        id: props.defaultInfo["art_id"]
      })
    }

    return {
      dialogVisible,
      logSummernoteInput,
      handleConfirmClick
    }
  }
})
</script>
