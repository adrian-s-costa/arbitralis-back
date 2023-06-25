import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/weather')
  async getWeather() {
    return await this.weatherService.getWeather();
  }
}
