import robot from 'robotjs';
import { Duplex } from 'stream';

export default (
  cmdKey: string,
  duplex: Duplex,
  width: string | undefined = '100',
  length: string | undefined = '100',
) => {
  let { x, y }: { x: number, y: number } = robot.getMousePos();

  const widthAsNum = Number(width);
  const lengthAsNum = Number(length);

  robot.mouseClick();
  robot.mouseToggle('down');

  for (let i = 0; i <= widthAsNum; i += 1) {
    robot.dragMouse(x + i, y);
  }

  x = robot.getMousePos().x;

  for (let i = 0; i <= lengthAsNum; i += 1) {
    robot.dragMouse(x, y - i);
  }

  y = robot.getMousePos().y;

  for (let i = 0; i <= widthAsNum; i += 1) {
    robot.dragMouse(x - i, y);
  }

  x = robot.getMousePos().x;

  for (let i = 0; i <= lengthAsNum; i += 1) {
    robot.moveMouse(x, y + i);
  }

  robot.mouseToggle('up');

  duplex.write(`${cmdKey} \0`);
};
