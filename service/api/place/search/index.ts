import { getHttpClient } from "@/config/httpClientsHelper";
import { PlaceListReply } from "@/generated/place/place.reply";
import { GetPlaceConditionRequest } from "@/generated/place/place.request";

const API_URL = "/place/list";

export async function placeSearch(
  request: GetPlaceConditionRequest
): Promise<PlaceListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
