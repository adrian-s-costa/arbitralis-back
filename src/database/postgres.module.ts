import { Module } from '@nestjs/common';
import { Pool } from 'pg';

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