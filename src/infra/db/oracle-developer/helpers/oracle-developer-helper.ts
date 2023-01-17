import oracledb, { PoolAttributes, Pool } from 'oracledb';
import IConnection from './IConnection';

export const OracleConnection = {
  pool: null as unknown as Pool,
  uri: null as unknown as PoolAttributes["connectString"],

  async connect(con: IConnection) {
    this.pool = await oracledb.createPool(con);
  },
  async disconnect() {
    if (this.pool) {
      await this.pool.close();
    }
  },

  async execute(query: string): Promise<oracledb.Result<unknown>> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      return await connection.execute(query);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}
