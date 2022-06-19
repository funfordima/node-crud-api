import type { CustomClientRequest } from "./custom-client-request.model.js";
import type { CustomServerResponse } from "./custom-server-response.model.js";

export type Middleware = (req: CustomClientRequest, res: CustomServerResponse) => unknown;
