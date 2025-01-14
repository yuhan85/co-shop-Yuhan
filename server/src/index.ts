// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './lib/dbConnection';
import './models';


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function startServer() {
  await db.sync({ force: true });
  // sequelize.sync(); Safe Sync option
  console.log('Database schema updated successfully');

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

startServer();