import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherRepository } from './weather.repository';

let lat: any, lng: any, clima: any, graus: any, cidade: any;

@Injectable()
export class WeatherService {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async getWeather(city: String) {
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&language=pt-BR&key=AIzaSyD8c9KypCH7G5UyJNEpekKjBv9b-Thh9n8`)
    .then((res)=>{
      //console.log(res.data);
      cidade = res.data.results[0].formatted_address;
      lat = res.data.results[0].geometry.location.lat;
      lng = res.data.results[0].geometry.location.lng;
    })
    .catch((err)=>{
      return err;
    })
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=744e9bd530130dda6f010c9d2f151042&lang=pt&units=metric`)
      .then((res)=>{
        //console.log(res.data);
        clima = res.data.weather[0].description;
        graus = Math.round(res.data.main.temp) + "°C";
      })
      .catch((err)=>{
        console.log(err);
      })
    const dbResponse = await this.weatherRepository.create(clima, graus, cidade);
    return dbResponse;
  }
}
