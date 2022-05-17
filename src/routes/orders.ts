import { Router } from 'express';
import OrderController from '../controllers/orders';
import LoginMiddleware from '../middlewares/login';
import OrderMiddleware from '../middlewares/orders';

const router = Router();
const orderController = new OrderController();
const orderMiddleware = new OrderMiddleware();
const loginMiddleware = new LoginMiddleware();

router.get('/', orderController.getAll);
router.post('/', loginMiddleware.authorization, orderMiddleware.validate, orderController.create);

export default router;