import robot from 'robotjs';
import { Duplex } from 'stream';

export default (cmdKey: string, duplex: Duplex, XDistance: string | undefined = '0') => {
  const { x, y }: { x: number, y: number } = robot.getMousePos();

  robot.moveMouse(x + Number(XDistance), y);
  duplex.write(`${cmdKey} ${Number(x) + Number(XDistance)},${y}\0`);
};
