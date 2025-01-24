import express from 'express';
import countryRoutes from './routes/countryRoutes';

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/api/countries', countryRoutes); // Use country routes

app.listen(3000, () => console.log('Server is running on port 3000'));