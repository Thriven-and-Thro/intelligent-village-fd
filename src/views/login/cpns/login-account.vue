<template>
  <div class="login-account">
    <el-form
      :model="ruleForm"
      :rules="ruleAccount"
      label-width="85px"
      ref="formRef"
    >
      <!-- prop用来匹配验证的是哪一个输入框 -->
      <el-form-item label="地区" prop="account">
        <v-distpicker
          class="distpicker"
          v-bind="ruleForm.account"
          @selected="getData"
        ></v-distpicker>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          :clearable="true"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { ElForm } from "element-plus"
import VDistpicker from "v-distpicker"

import { ruleAccount } from "../config/account-config"
import localCache from "@/utils/cache"
import useLoginStore from "@/store/login/login"

export default defineComponent({
  name: "LoginAcocount",
  components: {
    VDistpicker
  },
  setup() {
    const accountCache = localCache.getCache("account")
    let ruleForm = reactive({
      account: accountCache ?? {},
      pass: localCache.getCache("pass") ?? ""
    })

    // 选择完毕获取地区
    function getData(data: any) {
      const { area, city, province } = data
      // 对格式进行处理
      ruleForm.account = {
        area: area.value,
        city: city.value,
        province: province.value
      }
    }

    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isCheckKeep: boolean) => {
      // ElForm 中有一个方法validate能对表单进行验证，并且函数的参数为验证结果boolean
      formRef.value?.validate((valid) => {
        if (valid) {
          // 验证是否要记住密码
          if (isCheckKeep) {
            localCache.setCache("account", ruleForm.account)
            localCache.setCache("pass", ruleForm.pass)
          } else {
            localCache.deleteCache("account")
            localCache.deleteCache("pass")
          }
        }
      })

      const { accountLoginAction } = useLoginStore()

      // 对格式进行处理
      const { area, city, province } = ruleForm.account
      const account = `${province}-${city}-${area}`

      accountLoginAction({
        type: 1,
        name: account,
        password: ruleForm.pass
      })
    }

    return {
      ruleForm,
      ruleAccount,
      formRef,
      loginAction,
      getData
    }
  }
})
</script>

<style lang="less" scoped>
.login-account {
  padding-top: 15px;
  .el-input {
    width: 90%;
  }

  :deep(.distpicker-address-wrapper) {
    height: 31px;
    width: 100%;
    select {
      padding: 0rem 0.75rem;
      height: 31px;
      min-width: 30%;
      max-width: 30%;
      width: 30%;
    }
  }
}
</style>
