import path from 'path';

export default {
  port: 3000,
  logPath: path.resolve(__dirname, '../logs/access.log'),
  db: {
    username: 'admin',
    password: 'wjn971004',
    database: 'todolist',
  },
};
