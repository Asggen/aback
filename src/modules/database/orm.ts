import { config } from '../../core/config';
import { postgresdbConfigs } from './postgres';
import { connectMongoDatabases } from './mongo';

// Function to handle dynamic database connections based on config
export const connectDatabases = async () => {
  try {
    // Connect to PostgreSQL if enabled in the config
    if (config.database.DB_POSTGRES === 'true' || config.database.DB_CONNECT_ALL === 'true') {
      await postgresdbConfigs();
      console.log('PostgreSQL connected');
    }

    // Connect to MongoDB if enabled in the config
    if (config.database.DB_MONGO === 'true' || config.database.DB_CONNECT_ALL === 'true') {
      await connectMongoDatabases();
      console.log('MongoDB connected');
    }

    console.log('Database(s) connected successfully');
  } catch (error) {
    console.error('Error connecting to databases:', error);
    throw error; // Rethrow to handle higher-level
  }
};
