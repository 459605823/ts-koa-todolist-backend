import Router from 'koa-router';
import { login, register, githubLogin } from '../controler';

const router = new Router();

router.prefix('/api');

router.post('/login', login);
router.post('/register', register);
router.get('/auth/redirect', githubLogin);

export default router;
