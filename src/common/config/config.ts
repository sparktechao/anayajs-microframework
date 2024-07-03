import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3005,
  api: {
    prefix: '/api',
  },
  databaseURL: process.env.DATABASE_URL,
};
