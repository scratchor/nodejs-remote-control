import robot from 'robotjs';

export default (cmdKey, duplex, width, length) => {
  let { x, y } = robot.getMousePos();

  setTimeout(() => {
    robot.mouseToggle('down');
    for (let i = 0; i <= width; i += 1) {
      robot.dragMouse(x + i, y);
    }

    x = robot.getMousePos().x;

    for (let i = 0; i <= length; i += 1) {
      robot.dragMouse(x, y - i);
    }

    y = robot.getMousePos().y;

    for (let i = 0; i <= width; i += 1) {
      robot.dragMouse(x - i, y);
    }

    x = robot.getMousePos().x;

    for (let i = 0; i <= length; i += 1) {
      robot.moveMouse(x, y + i);
    }
    robot.mouseToggle('up');
    duplex.write(`${cmdKey} \0`);
  }, 2000);
};
