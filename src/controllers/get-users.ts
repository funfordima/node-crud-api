import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import type { User } from "../models/user.model.js";
import { handleBadRequest } from "../utils/handle-bad-request.util.js";
import { handleNotFoundRequest } from "../utils/handle-not-found-request.util.js";
import { handleServerError } from "../utils/handle-server-error.util.js";
import { validateId } from "../utils/validate-id.util.js";

export const getUsers = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
  try {
    const requestId = req.pathName;

    if (requestId) {
      const isValidId = validateId(requestId);

      if (!isValidId) {
        handleBadRequest(res);
        return;
      }

      const user = users.find(({ id }) => id === requestId);

      if (!user) {
        handleNotFoundRequest(res, requestId);
        return;
      }

      res.writeHead(200, {
        // eslint-disable-next-line
        'Content-type': 'application/json'
      });
      res.send(user);
      return;
    }

    res.writeHead(200, {
      // eslint-disable-next-line
      'Content-type': 'application/json'
    });
    res.writeHead(200, {
      // eslint-disable-next-line
      'Process-id': process.pid
    });
    res.send(users);
  } catch (err) {
    handleServerError(res, err);
  }
};
