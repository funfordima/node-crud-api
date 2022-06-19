import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/index.js';
import { Router } from '../framework/router.js';
import type { User } from '../models/user.model.js';

const router = new Router();

const users: User[] = [];

router.get('/api/users', getUsers(users));

router.post('/api/users', createUser(users));

router.put('/api/users', updateUser(users));

router.delete('/api/users', deleteUser(users));

export default router;
