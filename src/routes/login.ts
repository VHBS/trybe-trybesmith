import { Router } from 'express';
import LoginController from '../controllers/login';
import LoginMiddleware from '../middlewares/login';

const router = Router();
const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

router.post('/', loginMiddleware.validate, loginController.authorization);

export default router;