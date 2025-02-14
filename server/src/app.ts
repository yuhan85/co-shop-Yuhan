import express, { Request, Response, NextFunction } from 'express';
import countryRoutes from './routes/countryRoutes';
import couponRoutes from './routes/couponRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import storeRoutes from './routes/storeRoutes';
import cartRoutes from './routes/cartRoutes';
import cartitemRoutes from './routes/cartitemRoutes';
import orderitemRoutes from './routes/orderitemRoutes';
import paymentRoutes from './routes/paymentRoutes';
import userRoutes from './routes/userRoutes';

import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(express.json()); // Middleware to parse JSON

app.use('/api/countries', countryRoutes); // Use country routes
app.use('/api/coupons', couponRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cartitems', cartitemRoutes);
app.use('/api/orderitems', orderitemRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/countries', countryRoutes); // Use country routes
app.use('/api/users', userRoutes); // Use country routes

// Explicitly cast errorHandler to an ErrorRequestHandler function
app.use(errorHandler as express.ErrorRequestHandler);

export default app;