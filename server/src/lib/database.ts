// import { Pool } from 'pg';

// class DatabaseService {
//   private pool: Pool;

//   constructor() {
//     this.pool = new Pool({
//       user: 'postgres',
//       password: 'password',
//       host: 'localhost',
//       port: 5432,
//       database: 'Practice5',
//     });
//   }

//   public query(text: string, params?: any[]) {
//     return this.pool.query(text, params);
//   }
// }

// export default DatabaseService;

import { Sequelize, QueryTypes } from 'sequelize';
import db from './dbConnection';

class DatabaseService {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = db;
  }

  public async query(text: string, params?: any[]) {
    try {
      const result = await this.sequelize.query(text, {
        replacements: params,
        type: QueryTypes.INSERT,
      });
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}

export default DatabaseService;
