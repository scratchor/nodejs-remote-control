import { createWebSocketStream, WebSocketServer } from 'ws';
import commands from '../commands.js';

export default () => {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws, req) => {
    console.log('connection');

    const ip = req.socket.remoteAddress;
    console.log('ip ', ip);

    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

    duplex.on('data', async (data) => {
      const [cmdKey, ...cmdToArr] = data.trim().split(/\s+/);

      console.log(cmdKey, ...cmdToArr);

      if (commands[cmdKey]) {
        await commands[cmdKey](cmdKey, duplex, ...cmdToArr);
      } else {
        console.error('Invalid command');
      }
    });
  });

  process.on('SIGINT', () => {
    process.stdout.write('Closing websocket...\n');
    wss.close();
  });
};
