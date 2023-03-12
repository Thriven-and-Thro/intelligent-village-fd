export interface IDataType<T = any> {
  code: number
  // data返回的类型不确定，不能写死用泛型
  data: T
}
