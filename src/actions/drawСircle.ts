import { Duplex } from 'stream';
import {
  mouse, Button, straightTo, Point,
} from '@nut-tree/nut-js';

export default async (cmdKey: string, duplex: Duplex, radius: string | undefined = '100') => {
  const { x, y }: { x: number, y: number } = await mouse.getPosition();
  const radiusAsNum = Number(radius);

  await mouse.click(Button.LEFT);
  await mouse.pressButton(Button.LEFT);

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const XCoordinate: number = x - radiusAsNum + (radiusAsNum * Math.cos(i));
    const YCoordinate: number = y + (radiusAsNum * Math.sin(i));

    // eslint-disable-next-line no-await-in-loop
    await mouse.move(straightTo(new Point(XCoordinate, YCoordinate)));
  }

  await mouse.releaseButton(Button.LEFT);
  duplex.write(`${cmdKey} \0`);
};
