// src/modules/database/mongo.ts

import { MongoClient } from 'mongodb'; // MongoDB client
import { config } from '../../core/config';

export const connectMongo = async () => {
  if (config.database.mongo || config.database.connectAll) {
    const client = new MongoClient(process.env.MONGO_URI || '');

    try {
      await client.connect();
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Optionally rethrow to handle in orm.ts
    }
  }
};
