import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostgresModule } from '../database/postgres.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [ PostgresModule ],
  controllers: [ UserController ],
  providers: [ UserService, UserRepository ],
})

export class UserModule {}