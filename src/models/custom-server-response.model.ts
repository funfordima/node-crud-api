import type { ServerResponse } from "http";

export interface CustomServerResponse extends ServerResponse {
  send(data: Object): void;
}
