import Router from 'koa-router';

const router = new Router();

router.get('/getTodo', (ctx, next) => {
  ctx.body = {
    name: 'cnm',
  };
});

export default router;
