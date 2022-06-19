import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import { User } from "../models/user.model.js";
import { handleBadRequest } from "../utils/handle-bad-request.util.js";
import { handleServerError } from "../utils/handle-server-error.util.js";

export const createUser = (users: User[]) => (req: CustomClientRequest, res: CustomServerResponse) => {
  try {
    const requestPath = req.pathName
    const user = new User(req.body);
    const { username, age } = user;

    if (!username || !age || requestPath) {
      handleBadRequest(res);
      return;
    }

    users.push(user);

    res.writeHead(201, {
      // eslint-disable-next-line
      'Content-type': 'application/json'
    });
    res.send(user);
  } catch (err) {
    handleServerError(res, err);
  }
};
