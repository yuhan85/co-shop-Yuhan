// // server.ts
// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import db from './lib/dbConnection';
// import './models'; //models doesn't use here
// import app from './app'; // Import the app instance

// const server = express();
// const PORT = process.env.PORT || 3000;

// server.use(cors());
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));

// async function startServer() {
//   await db.sync({ alter: true });
//   // sequelize.sync(); Safe Sync option
//   console.log('Database schema updated successfully');

//   server.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!');
//   });

//   // Use the app with all attached routes and controllers
//   server.use(app);

//   server.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// }

// startServer();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import App from './app';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import ProtectedController from './controllers/protected.controller';

const app = new App({
  port: 5000,
  middlewares: [
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
  ],
  controllers: [
    new HomeController(),
    new AuthController(),
    new ProtectedController(),
  ],
});

app.listen();
