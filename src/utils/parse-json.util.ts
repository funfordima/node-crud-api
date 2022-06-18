import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";

export const jsonParser = (_: CustomClientRequest, res: CustomServerResponse) => {
  res.send = (data: Object) => {
    res.end(JSON.stringify(data));
  }
};
