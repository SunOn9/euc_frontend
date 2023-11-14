import { getHttpClient } from "@/config/httpClientsHelper";
import { AreaReply } from "@/generated/area/area.reply";
import { RemoveAreaRequest } from "@/generated/area/area.request";

const API_URL = "/area/remove";

export async function areaRemove(
  request: RemoveAreaRequest
): Promise<AreaReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
