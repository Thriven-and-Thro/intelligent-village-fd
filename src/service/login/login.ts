import cfRequest from "../index"

import type { IAccount, ILoginResult } from "./type"
import type { IDataType } from "../types"

enum LoginAPI {
  AccountLogin = "/login"
}

export function accountLoginRequest(account: IAccount) {
  // 健全的类型定义方式，定义到具体每个数据的类型
  return cfRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
