import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "./assets/css/index.less"
import "normalize.css"
// import "element-plus/es/components/message/style/css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import { useLoginStore } from "./store"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
const { addMainRoute } = useLoginStore()
await addMainRoute()
app.use(router)

app.mount("#app")
