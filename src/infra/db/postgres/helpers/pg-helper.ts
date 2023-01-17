import pg, { PoolConfig } from 'pg';

export const PgConnection = {
  client: null as any,
  async connect(con: string): Promise<void> {
    try {
      this.client = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'teste-node',
        password: 'postgres',
        port: 5432
      });
    } catch (error) {
      console.error(error);
    }
  },
  async disconnect() {
    if (this.client) {
      await this.client.close();
    }
  },

  async execute(query: string): Promise<any> {
    let connection;
    try {
      return await this.client.query(query);
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
