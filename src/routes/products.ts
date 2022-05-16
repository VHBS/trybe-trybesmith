import { Router } from 'express';
import ProductController from '../controllers/products';
import ProductsMiddleware from '../middlewares/products';

const router = Router();

const productController = new ProductController();
const productMiddleware = new ProductsMiddleware();

router.get('/', productController.getAll);

router.post('/', productMiddleware.create, productController.create);

export default router;