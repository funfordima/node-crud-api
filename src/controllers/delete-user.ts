import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import type { User } from "../models/user.model.js";
import { handleBadRequest } from "../utils/handle-bad-request.util.js";
import { handleNotFoundRequest } from "../utils/handle-not-found-request.util.js";
import { handleServerError } from "../utils/handle-server-error.util.js";
import { validateId } from "../utils/validate-id.util.js";

export const deleteUser = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
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

      const userIndex = users.findIndex(({ id }) => id === requestId);

      users.splice(userIndex, 1);

      res.writeHead(204, {
        // eslint-disable-next-line
        'Content-type': 'application/json'
      });
      res.end(null);
      return;
    }

    handleBadRequest(res);
  } catch (err) {
    handleServerError(res, err);
  }
};
