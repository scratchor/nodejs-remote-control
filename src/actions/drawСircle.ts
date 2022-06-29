import robot from 'robotjs';
import { Duplex } from 'stream';

export default (cmdKey: string, duplex: Duplex, radius: string | undefined = '100') => {
  const { x, y }: { x: number, y: number } = robot.getMousePos();
  const radiusAsNum = Number(radius);

  robot.mouseClick();
  robot.mouseToggle('down');

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const XCoordinate: number = x - radiusAsNum + (radiusAsNum * Math.cos(i));
    const YCoordinate: number = y + (radiusAsNum * Math.sin(i));

    robot.moveMouse(XCoordinate, YCoordinate);
  }

  robot.mouseToggle('up');
  duplex.write(`${cmdKey} \0`);
};
