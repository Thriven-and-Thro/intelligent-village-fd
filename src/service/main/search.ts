import cfRequest from "@/service"
import type { IDataType } from "@/service/types"

export function searchPageListData(data: any) {
  return cfRequest.post<IDataType>({
    url: "/search",
    data
  })
}
