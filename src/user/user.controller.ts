import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  async getUser() {
    const user = await this.userService.findUser('ret@email');
    return user;
  }
}
