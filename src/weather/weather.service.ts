import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import axios from 'axios';
import { WeatherRepository } from './weather.repository';
import { ConfigService } from '@nestjs/config';

let clima: any, graus: any, cidade: any, icon: any;

const openWeatherApiKey = "744e9bd530130dda6f010c9d2f151042"

@Injectable()
export class WeatherService implements OnApplicationBootstrap{
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private configService: ConfigService
    ) {}

  async onApplicationBootstrap() {
    await this.updateWeatherPeriodically();
  }

  async updateWeatherPeriodically() {
    await this.updateWeatherData();

    setInterval(async () => {
      await this.updateWeatherData();
    }, 900000);
  }

  async updateWeatherData() {
    const updatedWeatherData = await this.getWeatherDataFromAPI();
    await this.weatherRepository.updateWeatherInDatabase(updatedWeatherData);
  }


  async getWeatherDataFromAPI() {
    const weatherRecords = await this.weatherRepository.getWeatherRecordsFromDatabase();
    const updatedWeatherData = [];

    for (const record of weatherRecords) {
      const { lat, lng, address, userId, id } = record;

      try {

        const api = this.configService.get<string>('OPEN_WEATHER_API_KEY');
        
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api}&lang=pt&units=metric`,
        );

        const clima = response.data.weather[0].description;
        const graus = Math.round(response.data.main.temp) + '°C';
        const icon = response.data.weather[0].icon;

        const updatedData = {
          id,
          clima,
          graus,
          icone: icon,
          lugar: address,
          userId,
          lat,
          lng,
        };

        updatedWeatherData.push(updatedData);
      } catch (error) {
        console.log(error);
      }
    }
    return updatedWeatherData;
  }

  async getWeather(lat: String, lng: String, address: String, userId: number) {
    const api = this.configService.get<string>('OPEN_WEATHER_API_KEY');
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api}&lang=pt&units=metric`)
      .then((res)=>{
        clima = res.data.weather[0].description;
        graus = Math.round(res.data.main.temp) + "°C";
        icon = res.data.weather[0].icon;
        cidade = address;
      })
      .catch((err)=>{
        console.log(err);
      })
    const dbResponse = await this.weatherRepository.create(clima, graus, cidade, userId, icon, lat, lng);
    return dbResponse;
  }

  async getWeatherByUserId(userId: number){
    const dbResponse = await this.weatherRepository.findWeatherByUserId(userId);
    return dbResponse;
  }

  async deleteWeatherById(id: number){
    const dbResponse = await this.weatherRepository.deleteWeatherById(id);
    return dbResponse;
  }
}