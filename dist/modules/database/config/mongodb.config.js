"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConnections = exports.connectToMongoDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
// Function to dynamically connect to a single MongoDB database
const connectToMongoDatabase = (name, uri) => {
    if (!uri) {
        console.warn(`MongoDB connection URI for ${name} is not defined.`);
        return;
    }
    if (!mongoConnections[name]) {
        mongoConnections[name] = connectToDB(uri, name);
    }
    else {
        console.log(`MongoDB connection for ${name} already exists.`);
    }
};
exports.connectToMongoDatabase = connectToMongoDatabase;
// Function to get all active connections
const getMongoConnections = () => mongoConnections;
exports.getMongoConnections = getMongoConnections;
//# sourceMappingURL=mongodb.config.js.map