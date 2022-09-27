import apiServer from './server.js';
import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const port = normalizePort(process.env.PORT || '3000');
apiServer.set('port', port);

export function startServer() {
  const server = http.createServer(apiServer);
  server.listen(port);
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
