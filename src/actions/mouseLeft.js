import robot from 'robotjs';

export default (cmdKey, duplex, XDistance) => {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x - Number(XDistance), y);
  duplex.write(`${cmdKey} ${Number(x) - Number(XDistance)},${y}\0`);
};
