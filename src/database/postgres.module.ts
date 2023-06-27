import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: (configService: ConfigService) => {
        const pgUser = configService.get<string>('PG_USER');
        const dbPassword = configService.get<string>('PG_PASSWORD');
        const dbDatabase = configService.get<string>('PG_DATABASE');

        return new Pool({
          host: 'localhost',
          port: 5432,
          user: pgUser,
          password: dbPassword,
          database: dbDatabase,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class PostgresModule {}