<template>
  <div class="login_tabs">
    <el-tabs v-model="activeName" :stretch="true">
      <el-tab-pane name="first">
        <!-- 标签内容可以使用插槽 -->
        <template #label>
          <span>登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="tab-select">
      <el-checkbox
        v-model="isCheckKeep"
        label="记住密码"
        class="keep_pass_check"
      ></el-checkbox>
      <el-link type="primary">忘记密码？联系管理员</el-link>
    </div>
    <div class="tab-commit">
      <el-button type="primary" @click="handleLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import LoginAccount from "./login-account.vue"

import localCache from "@/utils/cache"

export default defineComponent({
  name: "LoginPanel",
  components: {
    LoginAccount
  },
  setup() {
    const activeName = ref("first")
    const isCheckKeep = ref(localCache.getCache("isCheckKeep") ?? false)

    // InstanceType：通过一个普通对象构造一种特有的类型
    // defineComponent包裹的普通对象：组件的描述 =》 类：拥有构造函数的实例
    // typeof LoginAccount：获取普通对象的类型
    // InstanceType<typeof LoginAccount>：获得拥有构造函数的实例 = 类
    // <InstanceType<typeof Person>> === Person
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLoginClick = () => {
      // 是否账号登录
      if (activeName.value === "first") {
        // 是否记住密码
        accountRef.value?.loginAction(isCheckKeep.value)
        // 是否记住密码选项
        if (isCheckKeep.value) {
          localCache.setCache("isCheckKeep", true)
        } else {
          localCache.deleteCache("isCheckKeep")
        }
      }
    }

    return {
      activeName,
      isCheckKeep,
      handleLoginClick,
      accountRef
    }
  }
})
</script>

<style lang="less" scoped>
.login_tabs {
  display: flex;
  width: 500px;
  height: 285px;
  margin-right: 50px;

  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  border: 1px solid hsla(210, 18%, 87%, 1);
  border-radius: 15px;
  background-color: #f6f8fa;

  .title {
    color: #2c3e50;
  }

  .el-tabs {
    margin: 0 auto;
    width: 500px;
    height: fit-content;
    border-radius: 20px;
    &:deep(.el-tabs__item) {
      height: 50px;
      line-height: 50px;
    }
  }
  .tab-select {
    display: flex;
    margin-bottom: 15px;
    padding: 0 20px;
    width: 417px;
    height: 20px;
    justify-content: space-between;

    .keep_pass_check {
      height: 20px;
    }
  }
  .tab-commit {
    .el-button {
      width: 417px;
      height: 40px;
    }
  }
}
</style>
