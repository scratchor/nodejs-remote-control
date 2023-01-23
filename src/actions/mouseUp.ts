import { Duplex } from 'stream';
import { mouse, up } from '@nut-tree/nut-js';

export default async (cmdKey: string, duplex: Duplex, YDistance: string | undefined = '0') => {
  const { x, y }: { x: number, y: number } = await mouse.getPosition();

  await mouse.move(up(Number(YDistance)));
  duplex.write(`${cmdKey} ${x}, ${Number(y) - Number(YDistance)}\0`);
};
