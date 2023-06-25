import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class WeatherRepository {
  constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

  async findAll(): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM registros');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async create(clima: string, graus: string, cidade: String): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO registros (clima, graus, cidade) VALUES ($1, $2, $3) RETURNING *',
        [clima, graus, cidade],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}
