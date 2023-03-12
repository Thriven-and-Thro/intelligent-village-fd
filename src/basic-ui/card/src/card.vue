<template>
  <div class="CfCard">
    <el-card>
      <h2>{{ title }}</h2>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: "CfCard",
  props: {
    title: {
      type: String
    }
  }
})
</script>
