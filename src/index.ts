import Koa from 'koa';
import router from './route';
import config from './config';
import connectDatebase from './db';
import middleware from './middleware';
import { responseHandler, errorHandler } from './middleware/response';
const databaseUrl = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.xuez0.mongodb.net/${config.db.database}?retryWrites=true&w=majority`;

const main = async () => {
  const app = new Koa();
  app.use(middleware());
  app.use(errorHandler);
  app.use(router.routes()).use(router.allowedMethods());
  app.use(responseHandler);
  app.listen(config.port, () => {
    console.info(`server is running at http://localhost:${config.port}`);
  });
  await connectDatebase(databaseUrl);
};
main();
