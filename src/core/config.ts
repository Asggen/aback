// src/core/config.ts

export const config = {
    database: {
      postgres: process.env.DB_POSTGRES === 'true',  // Read from environment variables
      mongo: process.env.DB_MONGO === 'true',       // Read from environment variables
      connectAll: process.env.DB_CONNECT_ALL === 'true' // Flag to connect all DBs
    },
    // Other configuration values (e.g., server port, logging, etc.)
  };
  