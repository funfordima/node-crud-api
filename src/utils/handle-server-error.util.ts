import type { CustomServerResponse } from "../models/custom-server-response.model.js";

export const handleServerError = (res: CustomServerResponse, err: unknown) => {
  res.writeHead(500, {
    // eslint-disable-next-line
    'Content-type': 'application/json'
  });
  res.end(JSON.stringify({
    message: `Server doesn't respond ${err}`,
  }));
};
