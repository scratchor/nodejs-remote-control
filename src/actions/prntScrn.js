import robot from 'robotjs';
import Jimp from 'jimp';

export default async (cmdKey, duplex, size = 200) => {
  const { x, y } = robot.getMousePos();
  const bitMap = robot.screen.capture(x - size / 2, y - size / 2, size, size);
  console.log(bitMap);
  // new Jimp({ data: bitMap.image, width: size, height: size }, (err, image) => {
  //   if (err) console.error(err);
  //   console.log(image);
  //
  //   image.getBase64(Jimp.MIME_PNG, (err, base64Obj) => {
  //     if (err) console.error(err);
  //     console.log(base64Obj.split(',').pop());
  //     const base64Img = base64Obj.split(',').pop();
  //
  //     duplex.write(`${cmdKey} ${base64Img} \0`);
  //   });
  // });

  const image = await new Jimp({ data: bitMap.image, width: size, height: size });

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const color = bitMap.colorAt(x, y);
    const red = parseInt(color[0] + color[1], 16);
    const green = parseInt(color[2] + color[3], 16);
    const blue = parseInt(color[4] + color[5], 16);

    image.bitmap.data[idx] = Number(red);
    image.bitmap.data[idx + 1] = Number(green);
    image.bitmap.data[idx + 2] = Number(blue);
    image.bitmap.data[idx + 3] = 255;
  });

  image.getBase64(Jimp.MIME_PNG, (err, base64Obj) => {
    if (err) console.error(err);
    console.log(base64Obj);
    const base64Img = base64Obj.split(',').pop();
    console.log(base64Img);

    duplex.write(`${cmdKey} ${base64Img} \0`);
  });
};
