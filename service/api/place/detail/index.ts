import { getHttpClient } from "@/config/httpClientsHelper";
import { PlaceReply } from "@/generated/place/place.reply";
import { GetPlaceConditionRequest } from "@/generated/place/place.request";

const API_URL = "/place/detail";

export async function placeDetail(
  request: GetPlaceConditionRequest
): Promise<PlaceReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
