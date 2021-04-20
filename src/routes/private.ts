import Router from 'koa-router';
import {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  getUserInfo,
} from '../controler';
import { handleTokenMiddleware, koaJwtMiddleware } from '../middleware/auth';
const router = new Router();

router.prefix('/api');
router.use(handleTokenMiddleware);
router.use(koaJwtMiddleware());

router
  .get('/todo', getTodo)
  .post('/todo', addTodo)
  .put('/todo/:id', updateTodo)
  .delete('/todo/:id', deleteTodo)
  .get('/user', getUserInfo);

export default router;
