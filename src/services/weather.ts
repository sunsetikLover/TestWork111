import { WeatherBaseService } from '@/api';
import { ApiMethods, CityWeatherInfoTypes, WeatherForecast } from '@/types';

export class WeatherService extends WeatherBaseService {
  public static async getWeatherByCityName(cityName: string) {
    return await this.fetch<CityWeatherInfoTypes>({
      url: `${ApiMethods.Weather}?q=${cityName}&lang=ru&units=metric`,
      method: 'GET',
    });
  }

  public static async getWeatherForecast(cityName: string) {
    return await this.fetch<WeatherForecast>({
      url: `${ApiMethods.Forecast}?q=${cityName}&lang=ru&units=metric`,
      method: 'GET',
    });
  }
}
