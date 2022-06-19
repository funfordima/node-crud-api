import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import { handleBadRequest } from './handle-bad-request.util.js';

describe('handle bad request', () => {
  const res = {
    writeHead: jest.fn(),
    send: jest.fn(),
  };

  it('should send correct message while handle bad request', () => {
    handleBadRequest(res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.send).toBeCalledWith({
      message: 'Bad request',
    });
  });
});
