import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';

export default function middleware() {
  return compose([bodyParser(), cors()]);
}
