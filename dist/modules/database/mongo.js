"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDatabases = void 0;
const mongodb_config_1 = require("./config/mongodb.config");
const config_1 = require("../../core/config");
const connectMongoDatabases = () => {
    const dbURIs = [
        { name: 'SuperAdmin', uri: config_1.config.database.MONGO_URI_SUPER_ADMIN },
        { name: 'Analyst', uri: config_1.config.database.MONGO_URI_ANALYST },
        // { name: 'TinderAdmin', uri: config.database.MONGO_URI_TINDER_ADMIN },
        // { name: 'Developer', uri: config.database.MONGO_URI_DEVELOPER },
    ];
    dbURIs.forEach(({ name, uri }) => {
        if (uri) {
            (0, mongodb_config_1.connectToMongoDatabase)(name, uri); // Only connect if the URI is defined
        }
        else {
            console.warn(`MongoDB connection URI for ${name} is not defined.`);
        }
    });
};
exports.connectMongoDatabases = connectMongoDatabases;
//# sourceMappingURL=mongo.js.map