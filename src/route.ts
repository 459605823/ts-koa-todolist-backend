import Router from 'koa-router';
import { getTodo, addTodo, updateTodo, deleteTodo } from './controler';
import config from './config';
import jwt from 'jsonwebtoken';
const router = new Router();

router.prefix('/api');

router
  .get('/todo', getTodo)
  .post('/todo', addTodo)
  .put('/todo/:id', updateTodo)
  .delete('/todo/:id', deleteTodo);

router.post('/login', async (ctx: any, next) => {
  const { username, password } = ctx.request.body;
  if (username === 'beast' && password === 'wjn971004') {
    ctx.result = jwt.sign(
      {
        username,
      },
      config.secret,
    );
  } else {
    ctx.msg = '用户名或密码错误';
  }
  return next();
});

export default router;
