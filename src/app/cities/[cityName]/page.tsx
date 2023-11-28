import { Header, InfoWeatherCity } from "@/components"
import { CityWeatherInfoTypes } from "@/types"
import axios from "axios"
import { Metadata } from "next"

interface Props {
  cityName: string
}

export async function generateMetadata(
  { params }: { params: Props },
): Promise<Metadata> {

  const { data }: { data: CityWeatherInfoTypes } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${params.cityName}&APPID=201a37e4b2245471209a5e303ac84b27&lang=ru&units=metric`)

  return {
    title: data.name,
    description: data.weather[0].description
  }
}


export default function CityWeatherInfo({ params }: { params: Props }) {
  const { cityName } = params

  return (<>
    <Header isExists={false} />
    {cityName && <InfoWeatherCity cityName={cityName} />}
  </>
  )
}
