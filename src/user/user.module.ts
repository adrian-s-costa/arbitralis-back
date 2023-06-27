import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostgresModule } from '../database/postgres.module';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ PostgresModule, ConfigModule.forRoot()],
  controllers: [ UserController ],
  providers: [ UserService, UserRepository],
})

export class UserModule {}