import type { CustomServerResponse } from "../models/custom-server-response.model.js";

export const handleBadRequest = (res: CustomServerResponse) => {
  res.writeHead(400, {
    // eslint-disable-next-line
    'Content-type': 'application/json'
  });
  res.send({
    message: 'Bad request',
  });
};
