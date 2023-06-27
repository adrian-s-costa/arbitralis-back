import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signIn(email: String, pass: string) {
    const bcrypt = require('bcrypt');
    const user = await this.userRepository.findUser(email);
    const comparePasswords = bcrypt.compareSync(pass, user.password)

    if(!comparePasswords){
      throw new UnauthorizedException;
    }

    const payload = { userId: user.id, email: user.email, pfp: user.profile_pic };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
