import robot from 'robotjs';
import { Duplex } from 'stream';

export default (cmdKey: string, duplex: Duplex) => {
  const { x, y }: { x: number, y: number } = robot.getMousePos();

  duplex.write(`${cmdKey} ${x}px,${y}px \0`);
};
