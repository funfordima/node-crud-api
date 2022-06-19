import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import type { User } from "../models/user.model.js";
import { createUser } from './create-user.js';

describe('create user', () => {
  const users: User[] = [];
  const body = {
    id: '52a72783-f365-4430-881d-80fcd20f0425',
    username: 'TestUser',
    age: 25,
    hobbies: ['test-1', 'test-2'],
  };
  const req = {
    pathName: undefined,
    body,
  };
  const res = {
    writeHead: jest.fn(),
    send: jest.fn(),
  };

  it('should create new user', () => {
    const func = createUser(users);
    func(req as CustomClientRequest, res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();
    expect(users.length).toBe(1);
  });
});
