"use client"

import { CityWeatherInfoTypes } from '@/types'
import s from './info-weather-city.module.scss'
import { ArrowBackIcon, BarometrIcon, FavoriteIcon } from '@/icons'
import React, { useEffect, useState } from 'react'
import { ActiveFavoriteIcon } from '@/icons/active-favorite'
import Link from 'next/link'
import { getFormattedTime, getIcon } from '@/utils'
import axios from 'axios'

interface Props {
  cityName: string
}

export const InfoWeatherCity = ({ cityName }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [weatherCityInfo, setWeatherCityInfo] = useState<CityWeatherInfoTypes>()
  const [isLoading, setIsLoding] = useState(false)

  const toggleFavorite = () => {
    if (!weatherCityInfo) {
      return
    }
    const existingFavorites: CityWeatherInfoTypes[] = JSON.parse(localStorage.getItem("favorites") || '[]') || []

    const existingFavoriteIndex = existingFavorites.findIndex((favorite) => favorite.id === weatherCityInfo?.id)

    if (existingFavoriteIndex !== -1) {
      existingFavorites.splice(existingFavoriteIndex, 1)
      setIsFavorite(false)
    } else {
      existingFavorites.push(weatherCityInfo)
      setIsFavorite(true)
    }

    localStorage.setItem("favorites", JSON.stringify(existingFavorites))
  }

  const getWeatherInfo = async () => {
    setIsLoding(true)
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=201a37e4b2245471209a5e303ac84b27&lang=ru&units=metric`)
      
      if (data) {
        setWeatherCityInfo(data)
        const existingFavorites: CityWeatherInfoTypes[] = JSON.parse(localStorage.getItem("favorites") || '[]') || []

        const existingFavoriteIndex = existingFavorites.findIndex((favorite) => favorite.id === data.id)

        if (existingFavoriteIndex === -1) {
          return
        } else {
          setIsFavorite(true)
        }
      }
    } catch (error) {

    } finally {
      setIsLoding(false)
    }
  }


  useEffect(() => {
    if (cityName) {
      getWeatherInfo()
    }
  }, [])


  return (
    <div className={s.wrap}>
      {isLoading && <p>Загрузка...</p>}

      {weatherCityInfo && <div className='container'>
        <div className={s['wrap-top']}>
          <Link href={'/'} className={s['wrap-back']}>
            <ArrowBackIcon />
            <p className={s.back}>Назад</p>
          </Link>

          <div>
            <div className={s['wrap-icon']} onClick={toggleFavorite}>{isFavorite ? <ActiveFavoriteIcon /> : <FavoriteIcon />}</div>
          </div>
        </div>

        <div className={s['main-content']}>
          <div className={s['title-wrap']}>
            <h4 className={s.title}>{weatherCityInfo?.name}</h4>
          </div>
          <div className={s['title-desc-wrap']}>
            <p className={s['title-desc']}>{weatherCityInfo.weather[0].description}</p>
          </div>

          <div className={s['wrap-temp']}>
            <p className={s['text-temp']}>
              {Math.round(weatherCityInfo.main.temp)} &deg;
            </p>
            {getIcon.length && getIcon.map(({ icon, name }, id) => {
              const Svg = icon;
              return (
                <React.Fragment key={name}>
                  {name === weatherCityInfo.weather[0].main && <Svg />}
                </React.Fragment>
              )
            })}
          </div>

          <div className={s['pressure-wrap']}>
            <BarometrIcon />
            <p className={s['pressure-text']}>{weatherCityInfo.main.pressure} мм рт. ст.</p>
          </div>

          <div className={s['sunset-wrap']}>
            <p className={s['sunset-text']}>Закат в {getFormattedTime(weatherCityInfo.sys.sunset)}</p>
          </div>
        </div>
      </div>}
    </div>
  )
}
