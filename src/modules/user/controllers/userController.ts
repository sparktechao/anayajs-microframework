import { Request, Response, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import UserService from '../services/userService';
import { UserResponseDTO } from '../dtos/userDTO';
import { plainToClass } from 'class-transformer';
import { applyRoutes, Get } from '../../../common/decorators/httpRouteMethods';


@autoInjectable()
class UserController {
  constructor(private userService?: UserService) {}

  @Get('/:id')
  async getUser(req: Request, res: Response, next: NextFunction): Promise<UserResponseDTO | void> {
    const user = await this.userService!.getUserById(parseInt(req.params.id));
    return plainToClass(UserResponseDTO, user);
  }
}

export default applyRoutes(UserController);
