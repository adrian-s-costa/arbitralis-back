import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/weather/:city')
  async getWeather(@Param('city') city: String) {
    const cityWeather = await this.weatherService.getWeather(city);
    return cityWeather;
  }
}
