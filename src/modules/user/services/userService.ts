import { injectable } from 'tsyringe';
import PrismaService from '../../../common/services/prismaService';
import { User } from '@prisma/client';

@injectable()
class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}

export default UserService;
