import { Duplex } from 'stream';
import { mouse } from '@nut-tree/nut-js';

export default async (cmdKey: string, duplex: Duplex) => {
  const { x, y }: { x: number, y: number } = await mouse.getPosition();

  duplex.write(`${cmdKey} ${x}px,${y}px \0`);
};
