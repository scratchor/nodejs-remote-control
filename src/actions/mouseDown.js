import robot from 'robotjs';

export default (cmdKey, duplex, YDistance) => {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x, y + Number(YDistance));
  duplex.write(`${cmdKey} ${x}, ${Number(y) + Number(YDistance)}\0`);
};
