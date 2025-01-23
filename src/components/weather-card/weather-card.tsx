'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ForecastCard, GoBack, Header } from '@/components';
import { ActiveFavoriteIcon, BarometerIcon, FavoriteIcon } from '@/icons';
import { WeatherService } from '@/services';
import { useWeatherStore } from '@/store';
import { CityWeatherInfoTypes, WeatherForecastList } from '@/types';
import { getFormattedTime } from '@/utils';
import Image from 'next/image';

import s from './weather-card.module.scss';

interface Props {
  cityName: string;
}

export const WeatherCard = ({ cityName }: Props) => {
  const { toggleFavorite, isFavorite } = useWeatherStore();
  const [weatherCityInfo, setWeatherCityInfo] =
    useState<CityWeatherInfoTypes | null>(null);
  const [forecastData, setForecastData] = useState<WeatherForecastList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const url = `http://openweathermap.org/img/wn/${weatherCityInfo?.weather[0].icon}@2x.png`;

  const getWeatherInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        WeatherService.getWeatherByCityName(cityName),
        WeatherService.getWeatherForecast(cityName),
      ]);

      setWeatherCityInfo(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    if (cityName) {
      getWeatherInfo();
    }
  }, [cityName, getWeatherInfo]);

  const handleFavoriteToggle = () => {
    if (weatherCityInfo) {
      toggleFavorite(weatherCityInfo);
    }
  };

  return (
    <>
      <Header isExists={false} />

      <div className={s.wrap}>
        {isLoading && <p>Загрузка...</p>}

        {!isLoading && !(weatherCityInfo && forecastData) && !isError && (
          <h3 className={s['title-exception']}>Ничего не найдено</h3>
        )}

        {isError && <h3 className={s['title-exception']}>Произошла ошибка</h3>}

        {weatherCityInfo && forecastData && (
          <div className="container">
            <div className={s['wrap-top']}>
              <GoBack />

              <div className={s['wrap-icon']} onClick={handleFavoriteToggle}>
                {isFavorite(weatherCityInfo.id) ? (
                  <ActiveFavoriteIcon />
                ) : (
                  <FavoriteIcon />
                )}
              </div>
            </div>

            <div className={s['main-content']}>
              <div className={s['title-wrap']}>
                <h1 className={s.title}>{weatherCityInfo.name}</h1>
              </div>
              <div className={s['title-desc-wrap']}>
                <p className={s['title-desc']}>
                  {weatherCityInfo.weather[0].description}
                </p>
              </div>

              <div className={s['wrap-temp']}>
                <p className={s['text-temp']}>
                  {Math.round(weatherCityInfo.main.temp)} &deg;
                </p>

                <Image
                  src={url}
                  alt={weatherCityInfo.weather[0].description}
                  height={200}
                  width={200}
                />
              </div>

              <div className={s['pressure-wrap']}>
                <BarometerIcon />
                <p className={s['pressure-text']}>
                  {weatherCityInfo.main.pressure} мм рт. ст.
                </p>
              </div>

              <div className={s['sunset-wrap']}>
                <p className={s['sunset-text']}>
                  Закат в {getFormattedTime(weatherCityInfo.sys.sunset)}
                </p>
              </div>

              <ForecastCard forecast={forecastData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
