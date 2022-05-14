import express from 'express';
import routerProducts from './routes/products';
import routerUsers from './routes/users';

const app = express();

app.use(express.json());

app.use('/products', routerProducts);
app.use('/users', routerUsers);

export default app;
