import { getHttpClient } from "@/config/httpClientsHelper";
import { AreaReply } from "@/generated/area/area.reply";
import { UpdateAreaRequest } from "@/generated/area/area.request";

const API_URL = "/area/update";

export async function areaUpdate(
  request: UpdateAreaRequest
): Promise<AreaReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
