import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import dotenv from 'dotenv';
import commands from '../commands.js';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8080;

export default () => {
  const wss = new WebSocketServer({ port: PORT });

  wss.on('listening', () => console.log(`WebSocketServer is running on port ${PORT}!`));

  wss.on('headers', (headers: string[]) => {
    console.log('headers:');
    headers.forEach((e: string) => console.log(`- ${e}`));
  });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const { remotePort, remoteAddress } = req.socket;
    const { readyState, isPaused } = ws;

    console.log('ip:', remoteAddress);
    console.log('port:', remotePort);
    console.log('readyState:', readyState);
    console.log('isPaused:', isPaused);

    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

    duplex.on('data', async (data) => {
      const [cmdKey, ...cmdToArr]: [cmdKey: string, cmdToArr: string | undefined] = data.trim().split(/\s+/);

      console.log(cmdKey, ...cmdToArr);

      if (commands[cmdKey]) {
        commands[cmdKey](cmdKey, duplex, ...cmdToArr);
      } else {
        console.error('Invalid command');
      }
    });

    ws.on('close', (code) => {
      duplex.destroy();
      console.log(`WebSocket was closed, code ${code}`);
    });

    duplex.on('error', ((err: Error) => {
      console.error(err);
    }));
  });

  process.on('SIGINT', () => {
    wss.close();
  });
};
