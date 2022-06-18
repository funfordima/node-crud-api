import type { User } from "./user.model.js";
import type { IncomingMessage } from "http";

export interface CustomClientRequest extends IncomingMessage {
  body?: User;
  pathName?: string;
}
