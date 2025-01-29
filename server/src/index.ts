// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './lib/dbConnection';
import './models'; //models doesn't use here
import app from './app'; // Import the app instance


const server = express();
const PORT = process.env.PORT || 3000; 

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(app);// Use the app with all attached routes

async function startServer() {
  await db.sync({ alter: true });
  // sequelize.sync(); Safe Sync option
  console.log('Database schema updated successfully');

  server.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();