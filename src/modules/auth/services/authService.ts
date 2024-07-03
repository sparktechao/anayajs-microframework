import { injectable, inject } from 'tsyringe';
import PrismaService from '../../../common/services/prismaService';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/authDTO';

@injectable()
class AuthService {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async registerUser(data: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }
}

export default AuthService;
