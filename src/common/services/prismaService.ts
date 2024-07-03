import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';

@singleton()
class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect()
      .then(() => console.log('Prisma connected'))
      .catch((err) => console.error('Prisma connection error', err));
  }
}

export default PrismaService;
