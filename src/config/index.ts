import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  SECRET,
  CLIENT_ID,
  CLIENT_SECRETS,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;
