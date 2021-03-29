import { connect, connection as db } from 'mongoose';

export default async (url: string) => {
  db.on('close', () => console.log('Database connection closed.'));
  return connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
