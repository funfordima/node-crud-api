import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";

export const parseUrl = (baseUrl: string) => (req: CustomClientRequest, _: CustomServerResponse): void => {
  const url = new URL(req.url!, baseUrl);
  const urlList = url.pathname.split('/').reduce<string[]>((acc, val) => (val ? (acc.push(val), acc) : acc), []);

  if (urlList.length > 2) {
    req.pathName = urlList.slice(2).join('/');
    return;
  }
};
