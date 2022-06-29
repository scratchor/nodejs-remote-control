import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import dotenv from 'dotenv';
import commands from '../commands.js';

export default () => {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws, req) => {
    console.log('connection');

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
  });

  process.on('SIGINT', () => {
    wss.close();
  });
};
