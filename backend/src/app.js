import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
// import jwt from 'koa-jwt';
import winston from 'winston';

import {errorHandler} from './middleware';

import router from './routes';

const app = new Koa();
const port = process.env.API_PORT || 8080;

app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.on('error', errorHandler);

const server = app.listen(port, () => {
  winston.info(`The app has started on port: ${port} 🚀👍🚀`);
});
export default server;
