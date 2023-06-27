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

  async insertUser(email: string, password: string, profile_pic: string){
    const client = await this.pool.connect();
    try {
      await client.query(
        'INSERT INTO users (email, password, profile_pic) VALUES ($1, $2, $3) RETURNING *',
        [email, password, profile_pic],
      );
    } finally {
      client.release();
    }
  }
}