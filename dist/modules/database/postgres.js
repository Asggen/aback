"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = exports.connectPostgres = void 0;
const pg_1 = require("pg");
const config_1 = require("../../core/config");
const connectPostgres = () => {
    const pool = new pg_1.Pool({
        connectionString: config_1.config.database.PG_DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // SSL for hosted DBs
        max: 10, // Maximum number of clients in the pool
        idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
        connectionTimeoutMillis: 2000, // Timeout for new connections (2 seconds)
    });
    pool.on('connect', () => {
        console.log('Connected to PostgreSQL');
    });
    pool.on('error', (err) => {
        if (err instanceof Error) {
            console.error('PostgreSQL pool error:', err.message);
        }
        else {
            console.error('Unknown PostgreSQL pool error');
        }
    });
    return pool;
};
exports.connectPostgres = connectPostgres;
// Usage example:
const pool = (0, exports.connectPostgres)();
// Query example:
const executeQuery = async (query, params = []) => {
    try {
        const client = await pool.connect(); // Acquire a client from the pool
        try {
            const result = await client.query(query, params);
            return result.rows;
        }
        finally {
            client.release(); // Release the client back to the pool
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query:', err.message);
        }
        else {
            console.error('Unknown error executing query');
        }
        throw err;
    }
};
exports.executeQuery = executeQuery;
//# sourceMappingURL=postgres.js.map