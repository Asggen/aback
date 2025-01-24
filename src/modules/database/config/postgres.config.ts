import { Pool } from 'pg';

interface PostgresConfig {
  name: string;
  connectionString: string;
}

const postgresConnections: Record<string, Pool> = {};

// Function to create a PostgreSQL pool
const createPostgresPool = (name: string, connectionString: string): Pool => {
    console.log(`Initializing PostgreSQL pool for database: ${name}`);
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 60000,
      connectionTimeoutMillis: 5000,
    });
  
    pool.on('connect', () => {
      console.log(`Connected to PostgreSQL database: ${name}`);
    });
  
    pool.on('error', (err) => {
      const error = err as Error;
      console.error(`PostgreSQL pool error for database ${name}:`, error.message);
    });
  
    pool.query('SELECT 1')
      .then(() => {
        console.log('Query executed, confirming pool connection');
      })
      .catch((error) => {
        console.error('Error executing query:', error);
      });
  
    return pool;
  };

// Function to initialize multiple PostgreSQL pools
export const connectPostgresDatabases = (dbConfigs: PostgresConfig[]) => {
    console.log('Initializing PostgreSQL connections...');
    dbConfigs.forEach(({ name, connectionString }) => {
      console.log(`Initializing connection for: ${name}`);
      if (!connectionString) {
        console.warn(`Connection string for database ${name} is not defined.`);
        return;
      }
  
      if (!postgresConnections[name]) {
        postgresConnections[name] = createPostgresPool(name, connectionString);
      } else {
        console.log(`PostgreSQL pool for database ${name} already exists.`);
      }
    });
  };
  

// Function to get a pool for a specific database
export const getPostgresPool = (name: string): Pool | undefined => {
  return postgresConnections[name];
};

// Export all connections for reference
export const getAllPostgresPools = (): Record<string, Pool> => postgresConnections;


process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    Object.values(postgresConnections).forEach((pool) => pool.end());
    process.exit(0);
  });
  