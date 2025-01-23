"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const http_1 = require("http");
const fs_1 = require("fs");
const path_1 = require("path");
const startServer = () => {
    const server = (0, http_1.createServer)((req, res) => {
        if (req.url === '/favicon.ico') {
            const faviconPath = (0, path_1.join)(__dirname, '../../src/favicon.ico'); // Adjust the path as needed
            (0, fs_1.readFile)(faviconPath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading favicon');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.end(data);
            });
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to ABack Framework!\n');
    });
    server.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map