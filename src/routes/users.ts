import { Router } from 'express';
import UserController from '../controllers/users';
import ValidateUsers from '../middlewares/users';

const router = Router();
const userController = new UserController();
const userMiddleware = new ValidateUsers();

router.post('/', userMiddleware.create, userController.create);

export default router;