import fs from 'fs';
import path from 'path';
import { configure, getLogger } from 'log4js';
import config from '../config';

const logsDir = path.parse(config.logPath).dir;
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: config.logPath,
      pattern: '-yyyy-MM-dd',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info',
    },
  },
});

export const logger = getLogger();

export const loggerMiddleware = async (ctx, next) => {
  // 请求开始时间
  const start = new Date().getTime();
  await next();
  // 结束时间
  const ms = new Date().getTime() - start;
  // 打印出请求相关参数
  const remoteAddress =
    ctx.headers['x-forwarded-for'] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket &&
      (ctx.socket.remoteAddress ||
        (ctx.socket.socket && ctx.socket.socket.remoteAddress)));
  let logText = `${ctx.method} ${ctx.status} ${
    ctx.url
  } 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(
    ctx.body,
  )} - ${remoteAddress} - ${ms}ms`;
  logger.info(logText);
};
