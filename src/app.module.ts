import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { PostgresModule } from './database/postgres.module';
import { WeatherRepository } from './weather/weather.repository';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PostgresModule, UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }) ],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherRepository],
})

export class AppModule {}
