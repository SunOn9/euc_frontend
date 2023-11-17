import { getHttpClient } from "@/config/httpClientsHelper";
import { PlaceReply } from "@/generated/place/place.reply";
import { UpdatePlaceRequest } from "@/generated/place/place.request";

const API_URL = "/place/update";

export async function placeUpdate(
  request: UpdatePlaceRequest
): Promise<PlaceReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
