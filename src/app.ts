import { connectDatabases } from './modules/database/orm';

export const startApp = async () => {
    try {
      // Initialize databases based on config
      await connectDatabases();
  
      // Other startup logic for your framework
  
    } catch (error) {
      console.error('Error during application startup:', error);
      process.exit(1); // Exit on failure to connect to the database
    }
  };
  