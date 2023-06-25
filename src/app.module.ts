import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { PostgresModule } from './database/postgres.module';
import { WeatherRepository } from './weather/weather.repository';

@Module({
  imports: [PostgresModule],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherRepository],
})

export class AppModule {}
