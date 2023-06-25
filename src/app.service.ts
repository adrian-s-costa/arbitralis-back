import { Injectable } from '@nestjs/common';
import axios from 'axios';

let lat: any, lng: any;

@Injectable()
export class AppService {
  async getWeather() {
    await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=campo-grande&key=AIzaSyD8c9KypCH7G5UyJNEpekKjBv9b-Thh9n8")
    .then((res)=>{
      lat = res.data.results[0].geometry.location.lat
      lng = res.data.results[0].geometry.location.lng
    })
    .catch((err)=>{
      return err;
    })
    const a = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=744e9bd530130dda6f010c9d2f151042&lang=pt&units=metric`)
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    return a;
  }
}
