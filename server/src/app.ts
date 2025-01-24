import express, { Request, Response, NextFunction } from 'express';
import countryRoutes from './routes/countryRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/api/countries', countryRoutes); // Use country routes

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(3000, () => console.log('Server is running on port 3000'));

export default app;