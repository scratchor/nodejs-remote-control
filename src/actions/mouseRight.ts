import { Duplex } from 'stream';
import { mouse, right } from '@nut-tree/nut-js';

export default async (cmdKey: string, duplex: Duplex, XDistance: string | undefined = '0') => {
  const { x, y }: { x: number, y: number } = await mouse.getPosition();

  await mouse.move(right(Number(XDistance)));
  duplex.write(`${cmdKey} ${Number(x) + Number(XDistance)},${y}\0`);
};
