import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { error } from 'console';
import { CreateUserDto } from 'src/dtos/user.dto';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(email: String) {
    const user = await this.userRepository.findUser(email);
    return user;
  }

  async insertUser(user: CreateUserDto){

    const validationErrors = await this.validatePasswords(user);
    if (validationErrors.length > 0) {
      throw new UnprocessableEntityException
    }

    const verifyIfUserAlreadyExist = await this.userRepository.findUser(user.email);

    if (verifyIfUserAlreadyExist){
      throw new ConflictException
    }

    const bcrypt = require('bcrypt');
    const saltRounds = 10;    
    const hash = bcrypt.hashSync(user.password, saltRounds);

    const response = await this.userRepository.insertUser(user.email, hash, user.profile_pic);
    return response;
  }



  private async validatePasswords(user: CreateUserDto): Promise<string[]> {
    const validationErrors: string[] = [];

    if (user.password !== user.repeat_password) {
      validationErrors.push('As senhas não correspondem.');
    }

    return validationErrors;
  }
}

