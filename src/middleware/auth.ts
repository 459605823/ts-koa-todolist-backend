import { Middleware } from 'koa';
import jwt from 'koa-jwt';
import config from '../config';

export default (opts?): Middleware => {
  return jwt({
    secret: config.secret,
    getToken: (ctx: any) => ctx.header.authorization,
  }).unless({
    path: ['/api/login'],
  });
};
