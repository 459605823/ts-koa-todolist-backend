import path from 'path';

export default {
  port: 3000,
  secret: 'woshinidie',
  logPath: path.resolve(__dirname, '../logs/access.log'),
  db: {
    username: 'admin',
    password: 'wjn971004',
    database: 'todolist',
  },
  client_id: '7cb56203f4b43e7aea70',
  client_secrets: '52cc9dd6da6ac151c716ffa06f419dabb86b0cb1',
};
