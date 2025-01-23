// src/modules/database/postgres.ts

import { Client } from 'pg'; // PostgreSQL client
import { config } from '../../core/config';

export const connectPostgres = async () => {
  if (config.database.postgres || config.database.connectAll) {
    const client = new Client({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: parseInt(process.env.PG_PORT || '5432', 10),
    });

    try {
      await client.connect();
      console.log('PostgreSQL connected');
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error);
      throw error; // Optionally rethrow to handle in orm.ts
    }
  }
};
