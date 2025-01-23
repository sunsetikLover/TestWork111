'use client';

import React from 'react';

import { WeatherForecastList } from '@/types';

import s from './forecast-card.module.scss';
import Image from 'next/image';

interface Props {
  forecast: WeatherForecastList[];
}

export const ForecastCard = ({ forecast }: Props) => {
  const groupedForecast = forecast.reduce<
    Record<string, WeatherForecastList[]>
  >((accumulator, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!accumulator[date]) accumulator[date] = [];
    accumulator[date].push(item);
    return accumulator;
  }, {});

  const fiveDays = Object.entries(groupedForecast).slice(0, 5);

  return (
    <div className={s.wrap}>
      {fiveDays.map(([date, items]) => {
        const dayWeather = items[0];
        const iconUrl = `https://openweathermap.org/img/wn/${dayWeather.weather[0].icon}@2x.png`;

        return (
          <div key={date} className={s['wrap-card']}>
            <p style={{ marginBottom: '8px' }}>
              {new Date(date).toLocaleDateString('ru-RU', { weekday: 'long' })}
            </p>
            <Image
              src={iconUrl}
              alt={dayWeather.weather[0].description}
              width={100}
              height={100}
            />
            <div className={s['card-desc']}>
              <p>{dayWeather.weather[0].description}</p>
              <p>
                <strong>{Math.round(dayWeather.main.temp)}°C</strong>
              </p>

              <p>Давление: {dayWeather.main.pressure} мм рт. ст.</p>
              <p>Влажность: {dayWeather.main.humidity}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
