import type { CustomServerResponse } from "../models/custom-server-response.model.js";

export const handleNotFoundRequest = (res: CustomServerResponse, requestId: string) => {
  res.writeHead(404, {
    // eslint-disable-next-line
    'Content-type': 'application/json'
  });
  res.send({
    message: `User with id: ${requestId} doesn't exist`,
  });
};
