import { ApiMethods, CityWeatherInfoTypes } from '@/types'
import { WeatherBaseService } from '@/api'
import { WEATHER_API_KEY } from '@/utils'

export class WeatherService extends WeatherBaseService {
  public static async getWeatherByCityName(cityName: string) {
    return await this.fetch<CityWeatherInfoTypes>({
      url: `${ApiMethods.Weather}?q=${cityName}&APPID=${WEATHER_API_KEY}&lang=ru&units=metric`,
      method: 'GET',
    })
  }
}
