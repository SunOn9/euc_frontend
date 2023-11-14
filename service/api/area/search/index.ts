import { getHttpClient } from "@/config/httpClientsHelper";
import { AreaListReply } from "@/generated/area/area.reply";
import { GetAreaConditionRequest } from "@/generated/area/area.request";

const API_URL = "/area/list";

export async function areaSearch(
  request: GetAreaConditionRequest
): Promise<AreaListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
