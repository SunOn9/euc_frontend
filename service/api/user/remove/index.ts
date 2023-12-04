import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { RemoveUserRequest } from "@/generated/user/user.request";

const API_URL = "/user/remove";

export async function userRemove(
  request: RemoveUserRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
