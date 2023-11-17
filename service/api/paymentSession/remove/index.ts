import { getHttpClient } from "@/config/httpClientsHelper";
import { RemovePaymentSessionRequest } from "@/generated/paymentSession/paymentSession.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/paymentSession/remove";

export async function paymentSessionRemove(
  request: RemovePaymentSessionRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
