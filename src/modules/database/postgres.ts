import { connectPostgresDatabases, getPostgresPool } from './config/postgres.config';
import { config } from '../../core/config';

export const postgresdbConfigs = async () => {
  const dbConfigs = [
    { name: 'MainDB', connectionString: config.database.PG_MAIN_DATABASE_URL ?? '' },
  ];

  console.log('PostgreSQL connection string:', config.database.PG_MAIN_DATABASE_URL);

  try {
    await connectPostgresDatabases(dbConfigs);
    console.log('PostgreSQL connected and pool initialized');
  } catch (error) {
    console.error('Error during PostgreSQL connection initialization:', error);
    throw error;
  }
};

export const executeMainDBQuery = async (query: string, params: any[] = []) => {
  const mainDBPool = getPostgresPool('MainDB');
  
  // Check if the pool is undefined
  if (!mainDBPool) {
    throw new Error('MainDB connection pool is not available');
  }

  try {
    const client = await mainDBPool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error executing query on MainDB:', err.message);
    } else {
      console.error('An unknown error occurred');
    }
    throw err;
  }
};


// Example of inserting demo data and fetching it
export const insertDemoData = async () => {
  const query = `
  INSERT INTO demo_table (name, description, created_at)
  VALUES ($1, $2, NOW()) 
  RETURNING id;
`;

const params = ['Sample Name', 'This is a demo description for testing.'];

  try {
    const result = await executeMainDBQuery(query, params);
    console.log('Demo data inserted with ID:', result[0].id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error inserting demo data:', err.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export const fetchData = async () => {
  try {
    await insertDemoData();
    const result = await executeMainDBQuery('SELECT * FROM demo_table');
    console.log('Demo data:', result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error fetching data:', err.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

(async () => {
  try {
    await postgresdbConfigs();
    await fetchData();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error initializing database or fetching data:', err.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
})();


