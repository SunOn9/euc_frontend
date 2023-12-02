import { getHttpClient } from "@/config/httpClientsHelper";
import { AreaReply } from "@/generated/area/area.reply";
import { GetAreaConditionRequest } from "@/generated/area/area.request";

const API_URL = "/area/detail";

export async function areaDetail(
  request: GetAreaConditionRequest
): Promise<AreaReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
