import { getHttpClient } from "@/config/httpClientsHelper";
import { RemovePaymentRequest } from "@/generated/payment/payment.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/payment/remove";

export async function paymentRemove(
  request: RemovePaymentRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
