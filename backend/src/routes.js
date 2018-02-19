import Router from 'koa-router';
// import winston from 'winston';

import catController from './controllers/cats';

const router = new Router();

router.get('/public/cats', catController.getCatsImgurl);

export default router;
