import {httpServer} from './src/http_server/index.js';
import webSocketServer from "./src/webSocketServer/index.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

webSocketServer()

process.on('uncaughtException', function (err) {
    console.log(err);
});
