import type { App } from "vue"

import registerProperties from "./register-properties"

export function registerApp(app: App): void {
  registerProperties(app)
}
