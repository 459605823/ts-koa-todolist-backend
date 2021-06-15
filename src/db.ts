import {connect, connection as db} from 'mongoose';

export default async (url: string) => {
  connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  db.on('close', () => console.log('Database connection closed.'));
  db.on('connected', function () {
    console.log(`${url} Connecting database successfully`);
  });

  db.on('error', function () {
    console.log(`${url} Failed to connect to database`);
  });

  db.on('disconnected', function () {
    console.log(`${url} Closed to connect to database`);
  });
};
