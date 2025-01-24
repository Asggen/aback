"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDatabases = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../core/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
// Utility function to create a MongoDB connection
const connectToDB = (connectionString, dbName) => {
    const connection = mongoose_1.default.createConnection(connectionString);
    connection.once('open', () => {
        console.log(`MongoDB connected: ${dbName}`);
    });
    connection.on('error', (err) => {
        console.error(`Error connecting to ${dbName}:`, err);
    });
    connection.on('disconnected', () => {
        console.log(`${dbName} disconnected`);
    });
    connection.on('reconnected', () => {
        console.log(`${dbName} reconnected`);
    });
    return connection;
};
// Map for storing MongoDB connections
const mongoConnections = {};
// Function to dynamically connect to multiple MongoDB instances
const connectMongoDatabases = () => {
    const dbURIs = [
        { name: 'SuperAdmin', uri: config_1.config.database.MONGO_URI_SUPER_ADMIN },
        { name: 'TinderAdmin', uri: config_1.config.database.MONGO_URI_TINDER_ADMIN },
        { name: 'Developer', uri: config_1.config.database.MONGO_URI_DEVELOPER },
        { name: 'Analyst', uri: config_1.config.database.MONGO_URI_ANALYST },
        { name: 'AuditorLogs', uri: config_1.config.database.MONGO_URI_AUDITOR_LOGS },
        { name: 'Auditor', uri: config_1.config.database.MONGO_URI_AUDITOR },
    ];
    dbURIs.forEach(({ name, uri }) => {
        if (uri) {
            mongoConnections[name] = connectToDB(uri, name);
        }
        else {
            console.warn(`MongoDB connection URI for ${name} is not defined.`);
        }
    });
};
exports.connectMongoDatabases = connectMongoDatabases;
//# sourceMappingURL=mongo.js.map