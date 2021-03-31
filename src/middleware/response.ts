import { Success, Failure } from '../response';
import { Middleware } from 'koa';
import { logger } from './logger';

export const responseHandler: Middleware = (ctx) => {
  if (ctx.result) {
    ctx.body = new Success(ctx.result);
  } else {
    ctx.body = new Failure(ctx.msg);
  }
};

export const errorHandler: Middleware = (ctx, next) => {
  return next().catch((err) => {
    if (!err.code) {
      logger.error(err.stack);
    }
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      ctx.status = err.code;
      ctx.body = new Failure(err.message);
      return Promise.resolve();
    }
  });
};
