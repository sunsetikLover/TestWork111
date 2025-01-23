/* eslint-disable prettier/prettier */
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useWeatherStore } from '@/store';

import s from './favorite-cities.module.scss';
import Image from 'next/image';
import { GoBack } from '@/components';

export const FavoriteCities = () => {
  const favorites = useWeatherStore((state) => state.favorites);
  const { push } = useRouter();

  const url = `http://openweathermap.org/img/wn/${favorites[0].weather[0].icon}@2x.png`;

  return (
    <div className={s.wrap}>
      <div className="container">
        <GoBack />

        <h1 className={s.title}>Избранные города</h1>

        <div className={s.grid}>
          {favorites.length > 0
            ? favorites.map((element) => (
              <div
                onClick={() => push(`cities/${element.name}`)}
                key={element.id}
                className={s.card}
              >
                <p className={s['card-title']}>{element.name}</p>
                <p className={s['card-temp']}>
                  {Math.round(element.main.temp)} &deg;
                </p>

                <Image
                  src={url}
                  alt={favorites[0].weather[0].description}
                  height={200}
                  width={200}
                />
              </div>
            ))
            : null}
        </div>
      </div>
    </div>
  );
};
