import robot from 'robotjs';

export default (cmdKey, duplex, YDistance) => {
  const { x, y } = robot.getMousePos();

  duplex.write(`${cmdKey} ${x}px,${y}px \0`);
};
