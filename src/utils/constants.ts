export const WEATHER_API_KEY = '201a37e4b2245471209a5e303ac84b27'
export const CITIES_API_KEY =
  '9764761c52mshc90d508614f9472p1c70f9jsn6af5ca78f7e1'

export const WEATHER_API = 'https://api.openweathermap.org/data/2.5/'
export const CITIES_API = 'https://wft-geo-db.p.rapidapi.com/v1/geo/'

export const getFormattedTime = (sunset: number): string => {
  const date = new Date(sunset)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${hours}:${minutes}`
}
