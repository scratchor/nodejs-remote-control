import robot, { Bitmap } from 'robotjs';
import Jimp from 'jimp';
import { Duplex } from 'stream';

export default async (cmdKey: string, duplex: Duplex, size = '200') => {
  const { x, y }: { x: number, y: number } = robot.getMousePos();
  const sizeAsNum = Number(size);

  const bitMap: Bitmap = robot.screen.capture(x - sizeAsNum / 2, y - sizeAsNum / 2, sizeAsNum, sizeAsNum);
  const image: Jimp = await new Jimp({ data: bitMap.image, width: sizeAsNum, height: sizeAsNum });

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (xCoord, yCoord, idx) => {
    const color = bitMap.colorAt(xCoord, yCoord);
    const red = parseInt(color[0] + color[1], 16);
    const green = parseInt(color[2] + color[3], 16);
    const blue = parseInt(color[4] + color[5], 16);

    image.bitmap.data[idx] = Number(red);
    image.bitmap.data[idx + 1] = Number(green);
    image.bitmap.data[idx + 2] = Number(blue);
    image.bitmap.data[idx + 3] = 255;
  });

  image.getBase64(Jimp.MIME_PNG, (err, base64Obj) => {
    if ((err)) console.error(err);
    const base64Img = base64Obj.split(',').pop();

    duplex.write(`${cmdKey} ${base64Img} \0`);
  });
};
