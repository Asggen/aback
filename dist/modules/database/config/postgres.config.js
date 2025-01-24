"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostgresPools = exports.getPostgresPool = exports.connectPostgresDatabases = void 0;
const pg_1 = require("pg");
const postgresConnections = {};
// Function to create a PostgreSQL pool
const createPostgresPool = (name, connectionString) => {
    console.log(`Initializing PostgreSQL pool for database: ${name}`);
    const pool = new pg_1.Pool({
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
        const error = err;
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
const connectPostgresDatabases = (dbConfigs) => {
    console.log('Initializing PostgreSQL connections...');
    dbConfigs.forEach(({ name, connectionString }) => {
        console.log(`Initializing connection for: ${name}`);
        if (!connectionString) {
            console.warn(`Connection string for database ${name} is not defined.`);
            return;
        }
        if (!postgresConnections[name]) {
            postgresConnections[name] = createPostgresPool(name, connectionString);
        }
        else {
            console.log(`PostgreSQL pool for database ${name} already exists.`);
        }
    });
};
exports.connectPostgresDatabases = connectPostgresDatabases;
// Function to get a pool for a specific database
const getPostgresPool = (name) => {
    return postgresConnections[name];
};
exports.getPostgresPool = getPostgresPool;
// Export all connections for reference
const getAllPostgresPools = () => postgresConnections;
exports.getAllPostgresPools = getAllPostgresPools;
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    Object.values(postgresConnections).forEach((pool) => pool.end());
    process.exit(0);
});
//# sourceMappingURL=postgres.config.js.map