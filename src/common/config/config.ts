import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  api: {
    prefix: '/api',
  },
  databaseURL: process.env.DATABASE_URL,
};
