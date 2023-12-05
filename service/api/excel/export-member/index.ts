import { getHttpClient } from "@/config/httpClientsHelper";
import { Null } from "@/generated/common";
import { ExportMemberRequest } from "@/generated/member/member.request";

const API_URL = "/excel/export-member";

export async function exportMember(
  request: ExportMemberRequest
): Promise<Null> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([resp.data]));

  return url;
}
