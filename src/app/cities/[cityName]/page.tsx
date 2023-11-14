"use client"

import { Header, InfoWeatherCity } from "@/components"
import { CityWeatherInfoTypes } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

interface Props {
  cityName: string
}

export default function CityWeatherInfo({ params }: { params: Props }) {
  const [weatherCityInfo, setWeatherCityInfo] = useState<CityWeatherInfoTypes>()
  const [isLoading, setIsLoding] = useState(false)

  const getWeatherInfo = async () => {
    setIsLoding(true)
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${params.cityName}&APPID=201a37e4b2245471209a5e303ac84b27&lang=ru&units=metric`)
      setWeatherCityInfo(data)
    } catch (error) {

    } finally {
      setIsLoding(false)
    }
  }

  useEffect(() => {
    if (params.cityName) {
      getWeatherInfo()
    }
  }, [])
  return (<>
    <Header isExists={false} />
    <div className="wrap">
      {isLoading && <p>Загрузка...</p>}
      {weatherCityInfo && <InfoWeatherCity weatherCityInfo={weatherCityInfo} />}
    </div>
  </>
  )
}
