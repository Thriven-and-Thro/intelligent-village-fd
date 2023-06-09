export interface IAccount {
  type: number
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
