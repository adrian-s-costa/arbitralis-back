import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Job cannot be empty' })
  job: string;
}

export class UserFromDbDTO {
  id: number;
  name: string;
  email: string;
  password: string
  profile_pic: string
}