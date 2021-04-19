import Koa from 'koa';
import privateRouter from './routes/private';
import publicRouter from './routes/public';
import config from './config';
import connectDatebase from './db';
import middleware from './middleware';
import { responseHandler, errorHandler } from './middleware/response';
const databaseUrl = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.xuez0.mongodb.net/${config.db.database}?retryWrites=true&w=majority`;

const main = async () => {
  await connectDatebase(databaseUrl);
  const app = new Koa();
  app.use(errorHandler);
  app.use(middleware());
  app.use(privateRouter.routes()).use(privateRouter.allowedMethods());
  app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
  app.use(responseHandler);
  app.listen(config.port, () => {
    console.info(`server is running at http://localhost:${config.port}`);
  });
};
main();
