import {Middleware, Context} from 'koa';
import koaJwt from 'koa-jwt';
import {SECRET} from '../config';
import jwt from 'jsonwebtoken';

export const handleTokenMiddleware: Middleware = async (ctx, next) => {
  // 将 token 中的数据解密后存到 ctx 中
  try {
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization;
      ctx.userInfo = jwt.verify(token, SECRET);
    } else {
      throw {code: 401, message: 'no authorization'};
    }
  } catch (err) {
    throw {code: 401, message: err.message};
  }
  await next();
};

export const koaJwtMiddleware = (): Middleware => {
  return koaJwt({
    secret: SECRET as string,
    getToken: (ctx: Context) => ctx.header.authorization as string,
  }).unless({
    path: ['/api/login'],
  });
};
