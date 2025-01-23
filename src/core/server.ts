import { createServer, IncomingMessage, ServerResponse } from 'http';
import { readFile } from 'fs';
import { join } from 'path';

export const startServer = (): any => {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/favicon.ico') {
      const faviconPath = join(__dirname, '../../src/favicon.ico');
      readFile(faviconPath, (err: Error | null, data: Buffer | null) => {
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
    res.end('Welcome to Asggen Backend Framework! (]ABack\n');
  });

  return server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
};
