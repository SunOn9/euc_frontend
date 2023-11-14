import { getHttpClient } from "@/config/httpClientsHelper";
import { PlaceReply } from "@/generated/place/place.reply";
import { RemovePlaceRequest } from "@/generated/place/place.request";

const API_URL = "/place/remove";

export async function placeRemove(
  request: RemovePlaceRequest
): Promise<PlaceReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
