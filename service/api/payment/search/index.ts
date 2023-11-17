import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentListReply } from "@/generated/payment/payment.reply";
import { GetPaymentConditionRequest } from "@/generated/payment/payment.request";

const API_URL = "/payment/list";

export async function paymentSearch(
  request: GetPaymentConditionRequest
): Promise<PaymentListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
