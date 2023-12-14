import { getHttpClient } from "@/config/httpClientsHelper";
import { Null, ExportOption } from "@/generated/common";

const API_URL = "/excel/export-fund";

export async function exportMember(
  request: ExportOption
): Promise<Null> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([resp.data]));

  return url;
}
