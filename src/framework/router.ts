import { MethodsEnum } from '../constants/methods.constant.js';
import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import type { Endpoint } from "../models/endpoint.model.js";

export class Router {
  endpoints: Endpoint = {};

  request(method: MethodsEnum, path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => unknown) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (this.endpoints[path][method]) {
      throw new Error(`${method} already exists in this path ${path}`);
    }

    endpoint[method] = handler;
  }

  get(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => any) {
    this.request(MethodsEnum.GET, path, handler);
  }

  post(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => any) {
    this.request(MethodsEnum.POST, path, handler);
  }

  put(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => any) {
    this.request(MethodsEnum.PUT, path, handler);
  }

  delete(path: string, handler: (req: CustomClientRequest, res: CustomServerResponse) => any) {
    this.request(MethodsEnum.DELETE, path, handler);
  }
}
