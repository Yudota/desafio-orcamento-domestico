import pg from 'pg';

export const PgConnection = {
  client: null as any,
  async connect(): Promise<void> {
    try {
      this.client = new pg.Pool({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT)
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
    try {
      await this.client.connect()

      return await this.client.query(query);
    } catch (err) {
      console.error(err);
    }
  }
}
