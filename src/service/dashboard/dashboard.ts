import cfRequest from "@/service"
import type { IDataType } from "@/service/types"

export function getChart(url: string, data: any) {
  return cfRequest.post<IDataType>({
    url: url,
    data
  })
}
