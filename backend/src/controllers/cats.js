import winston from 'winston';
import fs from 'fs';
import path from 'path';
import gm from 'gm';

const CAT_FOLDER = path.resolve('src/cats/');
const PUBLIC_CAT_FOLDER = path.resolve('public');
const OUTSIDE_URL = 'robin-pham.com/';

const catImages = fs.readdirSync(CAT_FOLDER).map(file => {
  return path.join(CAT_FOLDER, file);
});

const catchedImages = new Set(
  fs.readdirSync(PUBLIC_CAT_FOLDER).map(file => {
    return path.join(PUBLIC_CAT_FOLDER, file);
  }),
);

async function getCatsImgurl(ctx) {
  const indx = Math.floor(Math.random() * catImages.length);
  const imgPath = catImages[indx];
  const searchText = ctx.query.searchText;
  if (catchedImages.has(searchText)) {
    ctx.status = 200;
    ctx.body = path.resolve('public', `${searchText}.jpg`);
    return;
  }
  const newImage = await alterImage(imgPath, searchText);

  ctx.status = 200;
  ctx.body = `${OUTSIDE_URL}${newImage}`;
}

async function alterImage(imgPath, searchText) {
  const returnedFilename = `${searchText}.jpg`;
  const newFilename = path.resolve('public', returnedFilename);
  return new Promise((resolve, reject) => {
    gm(imgPath)
      .fill('#000000')
      .drawText(10, 20, searchText)
      .fontSize('25px')
      .write(newFilename, err => {
        if (err) {
          winston.info('Error occurred:', err);
          reject(err);
          return;
        }
        resolve(returnedFilename);
        winston.info('Successfully created image', newFilename);
      });
  });
}

export default {
  getCatsImgurl,
};
