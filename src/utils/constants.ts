export const API_KEY = '201a37e4b2245471209a5e303ac84b27'

export const getFormattedTime = (sunset: number): string => {
  const date = new Date(sunset)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${hours}:${minutes}`
}
