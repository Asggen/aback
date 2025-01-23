// src/modules/database/orm.ts

import { config } from '../../core/config';
import { connectPostgres } from './postgres';
import { connectMongo } from './mongo';

// Function to handle dynamic database connections based on config
export const connectDatabases = async () => {
  try {
    if (config.database.connectAll || config.database.postgres) {
      await connectPostgres();
    }

    if (config.database.connectAll || config.database.mongo) {
      await connectMongo();
    }

    console.log('All configured databases connected successfully');
  } catch (error) {
    console.error('Error connecting to databases:', error);
    throw error; // Optionally rethrow to handle higher-level
  }
};
