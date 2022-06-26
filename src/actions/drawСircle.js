import robot from 'robotjs';

export default (cmdKey, duplex, radius) => {
  const { x, y } = robot.getMousePos();

  // setTimeout(() => {
  //   for (let i = 0; i <= Math.PI * 2; i += 0.01) {
  //     const x = mousePos.x - radius + (radius * Math.cos(i));
  //     const y = mousePos.y + (radius * Math.sin(i));
  //
  //     robot.moveMouse(x, y);
  //   }
  //
  //   duplex.write(`${cmdKey}\0`);
  // }, 2000);
  robot.mouseToggle();
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const XCoordinate = x - radius + (radius * Math.cos(i));
    const YCoordinate = y + (radius * Math.sin(i));

    robot.moveMouse(XCoordinate, YCoordinate);
  }
  robot.mouseToggle('up');

  duplex.write(`${cmdKey} \0`);
};
