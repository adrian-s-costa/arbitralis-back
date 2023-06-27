import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/user.dto';
import { Response } from 'express';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async insertUser(
    @Body(new ValidationPipe()) user: CreateUserDto,
    @Res() res: Response,
    ) {
    try{
      await this.userService.insertUser(user);
      return res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      return res.status(error.status).json({ error: error.response.message });
    }
  }
}