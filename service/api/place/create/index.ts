import { getHttpClient } from "@/config/httpClientsHelper";
import { PlaceListReply } from "@/generated/place/place.reply";
import { CreatePlaceRequest } from "@/generated/place/place.request";

const API_URL = "/place/create";

export async function placeCreate(
  request: CreatePlaceRequest
): Promise<PlaceListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
