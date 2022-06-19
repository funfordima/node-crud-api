import type { MethodsEnum } from '../constants/methods.constant.js';
import type { CustomClientRequest } from './custom-client-request.model.js';
import type { CustomServerResponse } from './custom-server-response.model.js';

export interface Methods {
  [MethodsEnum.GET]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
  [MethodsEnum.POST]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
  [MethodsEnum.PUT]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
  [MethodsEnum.DELETE]?: (req: CustomClientRequest, res: CustomServerResponse) => unknown;
}
