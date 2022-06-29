import robot from 'robotjs';
import { Duplex } from 'stream';

export default (cmdKey: string, duplex: Duplex, YDistance: string | undefined = '0') => {
  const { x, y }: { x: number, y: number } = robot.getMousePos();

  robot.moveMouse(x, y - Number(YDistance));
  duplex.write(`${cmdKey} ${x}, ${Number(y) - Number(YDistance)}\0`);
};
