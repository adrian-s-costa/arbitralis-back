import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(email: String) {
    const user = await this.userRepository.findUser(email);
    return user;
  }
}
