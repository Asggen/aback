"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = exports.insertDemoData = exports.executeMainDBQuery = exports.postgresdbConfigs = void 0;
const postgres_config_1 = require("./config/postgres.config");
const config_1 = require("../../core/config");
const postgresdbConfigs = async () => {
    const dbConfigs = [
        { name: 'MainDB', connectionString: config_1.config.database.PG_MAIN_DATABASE_URL ?? '' },
    ];
    console.log('PostgreSQL connection string:', config_1.config.database.PG_MAIN_DATABASE_URL);
    try {
        await (0, postgres_config_1.connectPostgresDatabases)(dbConfigs);
        console.log('PostgreSQL connected and pool initialized');
    }
    catch (error) {
        console.error('Error during PostgreSQL connection initialization:', error);
        throw error;
    }
};
exports.postgresdbConfigs = postgresdbConfigs;
const executeMainDBQuery = async (query, params = []) => {
    const mainDBPool = (0, postgres_config_1.getPostgresPool)('MainDB');
    // Check if the pool is undefined
    if (!mainDBPool) {
        throw new Error('MainDB connection pool is not available');
    }
    try {
        const client = await mainDBPool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows;
        }
        finally {
            client.release();
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query on MainDB:', err.message);
        }
        else {
            console.error('An unknown error occurred');
        }
        throw err;
    }
};
exports.executeMainDBQuery = executeMainDBQuery;
// Example of inserting demo data and fetching it
const insertDemoData = async () => {
    const query = `
  INSERT INTO demo_table (name, description, created_at)
  VALUES ($1, $2, NOW()) 
  RETURNING id;
`;
    const params = ['Sample Name', 'This is a demo description for testing.'];
    try {
        const result = await (0, exports.executeMainDBQuery)(query, params);
        console.log('Demo data inserted with ID:', result[0].id);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error inserting demo data:', err.message);
        }
        else {
            console.error('An unknown error occurred');
        }
    }
};
exports.insertDemoData = insertDemoData;
const fetchData = async () => {
    try {
        await (0, exports.insertDemoData)();
        const result = await (0, exports.executeMainDBQuery)('SELECT * FROM demo_table');
        console.log('Demo data:', result);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error fetching data:', err.message);
        }
        else {
            console.error('An unknown error occurred');
        }
    }
};
exports.fetchData = fetchData;
(async () => {
    try {
        await (0, exports.postgresdbConfigs)();
        await (0, exports.fetchData)();
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error initializing database or fetching data:', err.message);
        }
        else {
            console.error('An unknown error occurred');
        }
    }
})();
//# sourceMappingURL=postgres.js.map