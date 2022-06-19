import type { MethodsEnum } from "../constants/methods.constant.js";
import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import type { Middleware } from "../models/middleware.js";
import type { User } from "../models/user.model.js";
import type { Router } from "./router.js";
import EventEmitter from "events";
import type { Server } from 'http';
import http from 'http';

export class Application {
  emitter = new EventEmitter();
  server = this.createServer();
  middleWares: Middleware[] = [];
  users: User[] = [];

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {

        this.emitter.on(this.getRouterMask(path, method as MethodsEnum), (req, res) => {
          const handler = endpoint[method as MethodsEnum];

          return handler?.(req, res);
        });
      });
    });
  }

  use(middleware: (req: CustomClientRequest, res: CustomServerResponse) => unknown): void {
    this.middleWares.push(middleware);
  }

  listen(port: string | number, callback: () => void): void {
    this.server.on('clientError', (_, socket) => {
      socket.end('HTTP/1.1 500 Bad Request\r\n\r\n');
    });
    this.server.listen(port, callback);
  }

  private createServer(): Server {
    return http.createServer((req: CustomClientRequest, res) => {
      let body = '';

      req.on('data', (chunk: Buffer) => {
        body += chunk;
      });

      req.on('error', (err) => {
        res.writeHead(500, {
          // eslint-disable-next-line
          'Content-type': 'application/json'
        });
        res.end(JSON.stringify({
          message: `Server doesn't respond ${err.message}`,
        }));
      });

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        this.middleWares.forEach((middleware) => middleware(req, res as any));
        const emitted = this.emitter.emit(this.getRouterMask(req.url!, req.method as MethodsEnum), req, res);

        if (!emitted) {
          res.writeHead(404, {
            // eslint-disable-next-line
            'Content-type': 'application/json'
          });
          res.end(JSON.stringify({
            message: `Requested page ${req.url} doesn't exist`,
          }));
        }
      });
    });
  }

  private getRouterMask(path: string, method: MethodsEnum): string {
    let newPath = path;

    if (path.startsWith('/api/users')) {
      const urlList = path.split('/').reduce<string[]>((acc, val) => (val ? (acc.push(val), acc) : acc), []);

      newPath = '/' + urlList.slice(0, 2);
    }

    return `[${newPath}]:[${method}]`;
  }
}
