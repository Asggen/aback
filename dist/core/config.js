"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    database: {
        DB_POSTGRES: process.env.DB_POSTGRES,
        DB_MONGO: process.env.DB_MONGO,
        DB_CONNECT_ALL: process.env.DB_CONNECT_ALL,
        PG_HOST: process.env.PG_HOST,
        PG_USER: process.env.PG_USER,
        PG_PASSWORD: process.env.PG_PASSWORD,
        PG_DATABASE: process.env.PG_DATABASE,
        PG_PORT: process.env.PG_PORT,
        PG_DATABASE_URL: process.env.PG_DATABASE_URL,
        PG_MAIN_DATABASE_URL: process.env.PG_MAIN_DATABASE_URL,
        // PG_LOGS_DATABASE_URL: process.env.PG_LOGS_DATABASE_URL,
        // PG_ANALYTICS_DATABASE_URL: process.env.PG_ANALYTICS_DATABASE_URL,
        MONGO_URI_SUPER_ADMIN: process.env.MONGO_URI_SUPER_ADMIN,
        MONGO_URI_ANALYST: process.env.MONGO_URI_ANALYST,
        // MONGO_URI_TINDER_ADMIN: process.env.MONGO_URI_TINDER_ADMIN,
        // MONGO_URI_DEVELOPER: process.env.MONGO_URI_DEVELOPER,
    }
};
//# sourceMappingURL=config.js.map