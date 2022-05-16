import express from 'express';
import routerProducts from './routes/products';
import routerUsers from './routes/users';
import routerOrders from './routes/orders';
import ErrorMiddleware from './middlewares/error';

const app = express();

app.use(express.json());

app.use('/products', routerProducts);
app.use('/users', routerUsers);
app.use('/orders', routerOrders);

const errorMiddleware = new ErrorMiddleware();

app.use(errorMiddleware.server);

export default app;