import { Body, Controller, Get, Param, Post, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherFromDbDTO } from 'src/dtos/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseGuards(AuthGuard)
  @Post('/weather')
  async getWeather(@Body() latlng) {
    var { latLng, address, res } = latlng
    const cityWeather = await this.weatherService.getWeather(latLng.lat, latLng.lng, address, res.data.userId);
    return cityWeather;
  }
  
  @UseGuards(AuthGuard)
  @Get('/weather/:userId')
  async getWeatherByUserId(@Param('userId', ParseIntPipe) userId: number ): Promise<WeatherFromDbDTO[]>{
    const userWeather = await this.weatherService.getWeatherByUserId(userId);
    return userWeather;
  }

  @UseGuards(AuthGuard)
  @Delete('/weather/:weatherId')
  async deleteWeatherById(@Param('weatherId', ParseIntPipe) weatherId: number ){
    const userWeather = await this.weatherService.deleteWeatherById(weatherId);
    return userWeather;
  }

}
