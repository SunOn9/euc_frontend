import { getHttpClient } from "@/config/httpClientsHelper";
import { AreaReply } from "@/generated/area/area.reply";
import { CreateAreaRequest } from "@/generated/area/area.request";

const API_URL = "/area/create";

export async function areaCreate(
  request: CreateAreaRequest
): Promise<AreaReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
