import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { UserFromDbDTO } from 'src/dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

  async findUser(email: String): Promise<UserFromDbDTO> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}