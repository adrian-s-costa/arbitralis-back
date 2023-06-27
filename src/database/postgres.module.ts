import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const pgUser = process.env.PG_USER;
const dbPassword = process.env.PG_PASSWORD;
const dbDatabase = process.env.PG_DATABASE;

@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: () => {
        return new Pool({
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'postgres',
          database: 'arbitralis',
        });
      },
    },
  ],
  exports: ['PG_CONNECTION'],
})

export class PostgresModule {}