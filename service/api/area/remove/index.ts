import { getHttpClient } from "@/config/httpClientsHelper";
import { RemoveAreaRequest } from "@/generated/area/area.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/area/remove";

export async function areaRemove(
  request: RemoveAreaRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
