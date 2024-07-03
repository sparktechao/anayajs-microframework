import expressLoader from './express';
import Logger from '../common/utils/logger';
import { connectDB } from '../common/config/db';
import PrismaService from '../common/services/prismaService';
import { container } from 'tsyringe';
import express from 'express';

export default async ({ expressApp }: { expressApp: express.Express }) => {
  await connectDB();
  Logger.info('✌️ DB loaded and connected!');

  container.registerInstance(PrismaService, new PrismaService());
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
