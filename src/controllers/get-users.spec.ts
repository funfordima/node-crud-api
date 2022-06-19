import type { CustomClientRequest } from "../models/custom-client-request.model.js";
import type { CustomServerResponse } from "../models/custom-server-response.model.js";
import { User } from "../models/user.model.js";
import { getUsers } from './get-users.js';

describe('get users', () => {
  const user = new User({
    id: '52a72783-f365-4430-881d-80fcd20f0425',
    username: 'TestUser',
    age: 25,
    hobbies: ['test-1', 'test-2'],
  });
  const user2 = new User({
    id: '52a72783-f365-4430-881d-80fcd20f0426',
    username: 'TestUser-2',
    age: 35,
    hobbies: ['test-3', 'test-4'],
  });
  const users = [user, user2];
  const req: { pathName?: string } = {
    pathName: undefined,
  };
  const res = {
    writeHead: jest.fn(),
    send: jest.fn(),
  };

  it('should retrieve all users', () => {
    const func = getUsers(users);
    func(req as CustomClientRequest, res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(users);
    expect(users.length).toBe(2);
  });

  it('should retrieve user by id', () => {
    const func = getUsers(users);
    req.pathName = '52a72783-f365-4430-881d-80fcd20f0426';
    func(req as CustomClientRequest, res as unknown as CustomServerResponse);

    expect(res.writeHead).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(user2);
  });
});
