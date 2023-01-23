import { Duplex } from 'stream';
import {
  mouse, Button, straightTo, Point,
} from '@nut-tree/nut-js';

export default async (
  cmdKey: string,
  duplex: Duplex,
  width: string | undefined = '100',
  length: string | undefined = '100',
) => {
  const { x, y }: { x: number, y: number } = await mouse.getPosition();
  const widthAsNum = Number(width);
  const lengthAsNum = Number(length);

  await mouse.click(Button.LEFT);
  await mouse.pressButton(Button.LEFT);

  for (let i = 0; i <= widthAsNum; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await mouse.move(straightTo(new Point(x, y - i)));
  }

  let point = await mouse.getPosition();

  for (let i = 0; i <= lengthAsNum; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await mouse.move(straightTo(new Point(point.x + i, point.y)));
  }

  point = await mouse.getPosition();

  for (let i = 0; i <= widthAsNum; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await mouse.move(straightTo(new Point(point.x, point.y + i)));
  }

  point = await mouse.getPosition();

  for (let i = 0; i <= lengthAsNum; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await mouse.move(straightTo(new Point(point.x - i, point.y)));
  }

  await mouse.releaseButton(Button.LEFT);

  duplex.write(`${cmdKey} \0`);
};
