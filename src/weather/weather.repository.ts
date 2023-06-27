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

  async findWeatherByUserId(userId: number): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM registros WHERE "userId" = $1', [userId]);
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

  async deleteWeatherById(id: number){
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM registros WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async create(clima: string, graus: string, lugar: String, userId: number, icon:string, lat: String, lng: String): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO registros (clima, "userId", icone, lugar, graus, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [clima, userId, icon, lugar, graus, lat, lng],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateWeatherInDatabase(weatherData: any) {
    const client = await this.pool.connect();
    try {
        for (const data of weatherData) {
        await client.query(
          'UPDATE registros SET clima = $1, graus = $2, icone = $3 WHERE lat = $4 AND lng = $5',
          [data.clima, data.graus, data.icone, data.lat, data.lng],
        );
      }
    } finally {
      client.release();
    }
  }

  async getWeatherRecordsFromDatabase() {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM registros');
      return result.rows;
    } finally {
      client.release();
    }
  }
}
