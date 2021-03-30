import {
  Success,
  Failure,
  ForbiddenError,
  InvalidQueryError,
} from '../response';
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
  return next().catch((err: ForbiddenError | InvalidQueryError) => {
    if (!err.code) {
      logger.error(err.stack);
    }
    ctx.status = err.code;
    ctx.body = new Failure(err.message);
    return Promise.resolve();
  });
};
