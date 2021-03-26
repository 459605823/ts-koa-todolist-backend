import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './route';
import config from './config';
import connectDatebase from './db';

const databaseUrl = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.xuez0.mongodb.net/${config.db.database}?retryWrites=true&w=majority`;

const main = async () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(config.port, () => {
    console.info(`server is running at http://localhost:${config.port}`);
  });
  try {
    await connectDatebase(databaseUrl);
    console.info('connect to database');
  } catch (error) {
    console.error(error.toString());
  }
};
main();
