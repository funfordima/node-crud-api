import type { Methods } from './methods.model.js';

export interface Endpoint {
  [key: string]: Methods;
}
