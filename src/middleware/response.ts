import {Success, Failure} from '../response';
import {Middleware} from 'koa';
import {logger} from './logger';

export const responseHandler: Middleware = (ctx) => {
  if (ctx.result) {
    ctx.body = new Success(ctx.result);
  } else {
    ctx.body = new Failure(ctx.msg);
  }
};

export const errorHandler: Middleware = (ctx, next) => {
  return next().catch((err) => {
    logger.error(err.stack);
    ctx.status = err.code ?? err.status ? err.code ?? err.status : 500;
    ctx.body = new Failure(
      err.originalError ? err.originalError.message : err.message
    );
    return Promise.resolve();
  });
};
