import Router from 'koa-router';
import { getTodo, addTodo, updateTodo, deleteTodo } from './controler';
const router = new Router();

router.prefix('/api');

router
  .get('/todo', getTodo)
  .post('/todo', addTodo)
  .put('/todo/:id', updateTodo)
  .delete('/todo/:id', deleteTodo);

export default router;
