import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from '../common/config/config';
import setupSwagger from './swagger';
import { errorHandler } from '../common/middlewares/errorHandler';
import authRoutes from '../modules/auth/routes/authRoutes';
import userRoutes from '../modules/user/routes/userRoutes';
import logger from '../common/utils/logger';
import listEndpoints from 'express-list-endpoints';


export default ({ app }: { app: Express }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.get('/', (req, res) => {
    res.status(200).send('Hello World');
  });

  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(require('method-override')());
  app.use(express.json());

  app.use(config.api.prefix + '/auth', authRoutes);
  app.use(config.api.prefix + '/users', userRoutes);

  setupSwagger(app);

  app.use((req, res, next) => {
    const err: any = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use(errorHandler);

   // Listar e logar todos os endpoints disponíveis
   const endpoints = listEndpoints(app);
   logger.info('📋 Lista de Endpoints Disponíveis:');
   endpoints.forEach((endpoint: { methods: any[]; path: any; }) => {
     logger.info(`${endpoint.methods.join(', ')} ${endpoint.path}`);
   });
};
