<template>
  <div class="login">
    <div class="title">
      <div>智慧村庄</div>
      <div>后台管理系统</div>
    </div>
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import loginPanel from "./cpns/login-panel.vue"

export default defineComponent({
  name: "Login",
  components: {
    loginPanel
  }
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background: url(@/assets/img/milad-fakurian-3iFOosUelfk-unsplash.jpg)
    no-repeat;
  overflow: hidden;
  background-size: cover;

  .title {
    width: 500px;
    margin-right: 50px;
    text-align: center;
    > div {
      color: #0e0060;
      &:first-child {
        font-size: 40px;
        font-weight: 900;
        margin: 5px 0;
      }
      &:last-child {
        font-size: 35px;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
