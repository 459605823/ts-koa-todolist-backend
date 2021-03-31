// 跨域
import cors from '@koa/cors';
// 处理post请求参数
import bodyParser from 'koa-bodyparser';
// 安全相关
import helmet from 'koa-helmet';
import compose from 'koa-compose';
import { loggerMiddleware } from './logger';
import corsHandler from './cors';
import auth from './auth';

export default function middleware() {
  return compose([
    bodyParser(),
    cors(corsHandler),
    helmet(),
    loggerMiddleware,
    auth(),
  ]);
}
