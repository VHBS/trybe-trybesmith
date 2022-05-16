import { Router } from 'express';
import UserController from '../controllers/users';
import UserMiddlware from '../middlewares/users';

const router = Router();
const userController = new UserController();
const userMiddleware = new UserMiddlware();

router.post('/', userMiddleware.create, userController.create);

export default router;