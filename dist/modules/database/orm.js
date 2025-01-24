"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabases = void 0;
const config_1 = require("../../core/config");
const postgres_1 = require("./postgres");
const mongo_1 = require("./mongo");
// Function to handle dynamic database connections based on config
const connectDatabases = async () => {
    try {
        // Connect to PostgreSQL if enabled in the config
        if (config_1.config.database.DB_POSTGRES === 'true' || config_1.config.database.DB_CONNECT_ALL === 'true') {
            await (0, postgres_1.connectPostgres)();
            console.log('PostgreSQL connected');
        }
        // Connect to MongoDB if enabled in the config
        if (config_1.config.database.DB_MONGO === 'true' || config_1.config.database.DB_CONNECT_ALL === 'true') {
            await (0, mongo_1.connectMongoDatabases)();
            console.log('MongoDB connected');
        }
        console.log('Database(s) connected successfully');
    }
    catch (error) {
        console.error('Error connecting to databases:', error);
        throw error; // Rethrow to handle higher-level
    }
};
exports.connectDatabases = connectDatabases;
//# sourceMappingURL=orm.js.map