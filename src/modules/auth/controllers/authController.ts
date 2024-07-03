import { Request, Response, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import AuthService from '../services/authService';
import { CreateUserDTO, UserResponseDTO } from '../dtos/authDTO';
import { plainToClass } from 'class-transformer';

import { Post, applyRoutes } from '../../../common/decorators/httpRouteMethods';

@autoInjectable()
class AuthController {
  constructor(private authService?: AuthService) {}

  @Post('/register')
  async registerUser(req: Request, res: Response, next: NextFunction): Promise<UserResponseDTO | void> {
    const createUserDTO: CreateUserDTO = req.body;
    const user = await this.authService!.registerUser(createUserDTO);
    return plainToClass(UserResponseDTO, user);
  }
}

export default applyRoutes(AuthController);
