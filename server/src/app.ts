import express, { Request, Response, NextFunction } from 'express';
//import countryRoutes from './routes/countryRoutes';
import couponRoutes from './routes/couponRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/api/countries', countryRoutes); // Use country routes
app.use('/api/coupons', couponRoutes);

// Explicitly cast errorHandler to an ErrorRequestHandler function
app.use(errorHandler as express.ErrorRequestHandler);

export default app;