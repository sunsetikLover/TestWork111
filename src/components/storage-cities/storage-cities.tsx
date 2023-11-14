import { CityWeatherInfoTypes } from '@/types'
import s from './storage-cities.module.scss'
import { getIcon } from '@/utils'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  favorites: CityWeatherInfoTypes[]
}

export const StorageCities = ({ favorites }: Props) => {
  const { push } = useRouter()

  return (
    <div>
      <div className={s.grid}>
        {favorites.length ? favorites.map((el) => (
          <div onClick={() => push(`cities/${el.name}`)} key={el.id} className={s.card}>
            <p className={s['card-title']}>{el.name}</p>
            <p className={s['card-temp']}>{Math.round(el.main.temp)} &deg;</p>
            {getIcon.length && getIcon.map((icon) => {
              const Svg = icon.icon;
              return (
                <React.Fragment key={icon.name}>
                  {icon.name === el.weather[0].main && <Svg width={icon.width} height={icon.height} />}
                </React.Fragment>
              )
            })}
          </div>
        )) : null}

      </div>
    </div>
  )
}
