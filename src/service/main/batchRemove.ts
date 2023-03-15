import cfRequest from "@/service"
import type { IDataType } from "@/service/types"

export function batchRemovePageData(data: any) {
  return cfRequest.post<IDataType>({
    url: "/batchRemove",
    data: data
  })
}
