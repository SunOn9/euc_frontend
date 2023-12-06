import { getHttpClient } from "@/config/httpClientsHelper";
import { RemoveClubFeeRequest } from "@/generated/clubFee/clubFee.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/cluFee/remove";

export async function clubRemove(
  request: RemoveClubFeeRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.clubId}`);
  return resp.data;
}
