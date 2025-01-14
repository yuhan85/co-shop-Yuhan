import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({ path: '../../.env' });
const db = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  dialect: 'mysql',
  logging: console.log,
});


db.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Error establishing database connection:', err);
  });

export default db;