import Router from 'koa-router';
import { getTodo, addTodo, updateTodo, deleteTodo } from './controler';
import { Success, Error } from './response';
const router = new Router();

router.prefix('/api');

router.get('/todo', async (ctx, next) => {
  const res = await getTodo();
  if (res) {
    ctx.body = new Success(res, 'success');
  } else {
    ctx.status = 500;
    ctx.body = new Error(null, 'failure');
  }
});

router.post('/todo', async (ctx, next) => {
  const body = ctx.request.body;
  if (!body.content) {
    ctx.status = 400;
    ctx.body = new Error('参数错误: content is required', 'failure');
  } else {
    const res = await addTodo(body);
    if (res) {
      ctx.body = new Success(res, 'success');
    } else {
      ctx.status = 500;
      ctx.body = new Error(null, 'failure');
    }
  }
});

router.put('/todo/:id', async (ctx, next) => {
  const res = await updateTodo(ctx.params.id, ctx.request.body);
  if (res) {
    ctx.body = new Success('修改成功', 'success');
  } else {
    ctx.status = 500;
    ctx.body = new Error(null, 'failure');
  }
});

router.delete('/todo/:id', async (ctx, next) => {
  const res = await deleteTodo(ctx.params.id);
  if (res) {
    ctx.body = new Success(res, 'success');
  } else {
    ctx.status = 500;
    ctx.body = new Error(null, 'failure');
  }
});

export default router;
