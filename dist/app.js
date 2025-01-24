"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const orm_1 = require("./modules/database/orm");
const startApp = async () => {
    try {
        // Initialize databases based on config
        await (0, orm_1.connectDatabases)();
        // Other startup logic for your framework
    }
    catch (error) {
        console.error('Error during application startup:', error);
        process.exit(1); // Exit on failure to connect to the database
    }
};
exports.startApp = startApp;
//# sourceMappingURL=app.js.map