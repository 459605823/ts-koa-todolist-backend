import { Middleware } from 'koa';
import koaJwt from 'koa-jwt';
import config from '../config';
import jwt from 'jsonwebtoken';

export const handleTokenMiddleware = async (ctx, next) => {
  // 将 token 中的数据解密后存到 ctx 中
  try {
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization;
      ctx.userInfo = jwt.verify(token, config.secret);
    } else {
      throw { code: 401, message: 'no authorization' };
    }
  } catch (err) {
    throw { code: 401, message: err.message };
  }
  await next();
};

export const koaJwtMiddleware = (opts?): Middleware => {
  return koaJwt({
    secret: config.secret,
    getToken: (ctx: any) => ctx.header.authorization,
  }).unless({
    path: ['/api/login'],
  });
};
