import Router from 'koa-router';
import { login, register } from '../controler';

const router = new Router();

router.prefix('/api');

router.post('/login', login);
router.post('/register', register);

export default router;
