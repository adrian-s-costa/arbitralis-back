import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import 'reflect-metadata';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  repeat_password: string;
  
  profile_pic: string;
}

export class UserFromDbDTO {
  id: number;
  email: string;
  password: string;
  profile_pic: string;
}

export class WeatherFromDbDTO {
  id: number;
  clime: string;
  userId: number;
  icone: string;
  lugar: string;
  graus: string;
}
