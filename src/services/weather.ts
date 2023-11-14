import { ApiMethods, CityWeatherInfoTypes } from '@/types'
import { BaseService } from '@/api'
import { API_KEY } from '@/utils'

export class WeatherService extends BaseService {
  public static async getWeatherByCity(cityName: string) {
    return await this.fetch<CityWeatherInfoTypes>({
      url: `${ApiMethods.Weather}?id=${cityName}&appid=${API_KEY}`,
      method: 'GET',
    })
  }
}
