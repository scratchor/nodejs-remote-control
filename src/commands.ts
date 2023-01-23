import { Duplex } from 'stream';
import mouseUp from './actions/mouseUp.js';
import drawRectangle from './actions/drawRectangle.js';
import mouseDown from './actions/mouseDown.js';
import mouseLeft from './actions/mouseLeft.js';
import mousePosition from './actions/mousePosition.js';
import mouseRight from './actions/mouseRight.js';
import drawCircle from './actions/drawСircle.js';

export interface ICommands {
  [method: string]: (
    cmdKey: string,
    duplex: Duplex,
    optional?: string,
    length?: string) => void;
}

export default {
  mouse_position: (cmdKey, duplex) => mousePosition(cmdKey, duplex),
  mouse_up: (cmdKey, duplex, YDistance) => mouseUp(cmdKey, duplex, YDistance),
  mouse_down: (cmdKey, duplex, YDistance) => mouseDown(cmdKey, duplex, YDistance),
  mouse_left: (cmdKey, duplex, YDistance) => mouseLeft(cmdKey, duplex, YDistance),
  mouse_right: (cmdKey, duplex, YDistance) => mouseRight(cmdKey, duplex, YDistance),
  draw_circle: (cmdKey, duplex, radius) => drawCircle(cmdKey, duplex, radius),
  draw_square: (cmdKey, duplex, width) => drawRectangle(cmdKey, duplex, width, width),
  draw_rectangle: (cmdKey, duplex, width, length) => drawRectangle(cmdKey, duplex, width, length),
} as ICommands;
