import mouseUp from './actions/mouseUp.js';
import drawRectangle from './actions/drawRectangle.js';
import mouseDown from './actions/mouseDown.js';
import mouseLeft from './actions/mouseLeft.js';
import mousePosition from './actions/mousePosition.js';
import mouseRight from './actions/mouseRight.js';
import drawCircle from './actions/drawСircle.js';
import printScreen from './actions/prntScrn.js';

export default {
  mouse_up: (cmdKey, duplex, YDistance) => mouseUp(cmdKey, duplex, YDistance),
  mouse_down: (cmdKey, duplex, YDistance) => mouseDown(cmdKey, duplex, YDistance),
  mouse_left: (cmdKey, duplex, YDistance) => mouseLeft(cmdKey, duplex, YDistance),
  mouse_right: (cmdKey, duplex, YDistance) => mouseRight(cmdKey, duplex, YDistance),
  mouse_position: (cmdKey, duplex) => mousePosition(cmdKey, duplex),
  draw_circle: (cmdKey, duplex, radius) => drawCircle(cmdKey, duplex, radius),
  draw_rectangle: (cmdKey, duplex, width, length) => drawRectangle(cmdKey, duplex, width, length),
  draw_square: (cmdKey, duplex, width) => drawRectangle(cmdKey, duplex, width, width),
  prnt_scrn: (cmdKey, duplex, size) => printScreen(cmdKey, duplex, size),
};
