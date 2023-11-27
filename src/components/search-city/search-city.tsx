"use client"

import { ArrowIcon, FavoriteIcon } from '@/icons'
import s from './search-city.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce, useOutsideClick } from '@/hooks'
import { useRouter } from 'next/navigation'
import { citiesData } from './cities.data'
import { StorageCities } from '../storage-cities/storage-cities'
import Highlighter from "react-highlight-words";

export const SearchCity = () => {
  const [valueCity, setValueCity] = useState('')
  const debouncedValue = useDebounce<string>(valueCity, 500)
  const [_, setCities] = useState<string[]>(citiesData)
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [isShowListOfCities, setIsShowListOfCities] = useState(false)
  const [favorites, setFavorites] = useState<[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { push } = useRouter()

  const refList = useOutsideClick(() => {
    setIsShowListOfCities(false)
  });

  const focusOnInput = () => {
    if (debouncedValue.length >= 3) {
      setIsShowListOfCities(true)
    }
  }

  const pasteTheCityToInput = (cityName: string) => {
    setValueCity(cityName)
    setIsShowListOfCities(true)
  }

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      const filteredCitiesChanges = citiesData.filter((el) => el.toLowerCase().includes(debouncedValue.toLowerCase()))
      setFilteredCities(filteredCitiesChanges)

      setIsShowListOfCities(true)
    } else {
      setFilteredCities([])
      setIsShowListOfCities(false)
    }
  }, [debouncedValue]);

  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites") || '[]') || []

    setFavorites(existingFavorites)
    setCities(citiesData)
    setIsLoading(false)
  }, [])

  return (
    <div className={s.wrap}>
      <div className='container'>
        <div className={s['wrap-input']} ref={refList}>
          <input onFocus={focusOnInput} value={valueCity} onChange={(e) => setValueCity(e.target.value)} className={s.input} placeholder='Укажите город' type="text" />
          <div className={s.list}>
            {(isShowListOfCities && filteredCities.length && debouncedValue.length >= 3) ? filteredCities.map((city) => (
              <div className={s['highlight-wrap']} onClick={() => push(`cities/${city}`)} key={city}>
                <Highlighter
                  searchWords={[debouncedValue]}
                  autoEscape={true}
                  className={s.highlight}
                  highlightStyle={{ color: 'white', backgroundColor: 'transparent' }}
                  textToHighlight={city}
                />
              </div>
            )
            ) : null}

            {(isShowListOfCities && !filteredCities.length && debouncedValue.length >= 3) && <p className={s['city-not-found']}>Ничего не найдено</p>}
          </div>
        </div>

        {favorites.length ? <StorageCities favorites={favorites} /> : null}

        {(!favorites.length && !isLoading) ? <div>
          <div className={s['helper-wrap']}>
            <div className={s['helper-wrap-inner']}>
              <div className={s.icon}>
                <ArrowIcon />
              </div>
              <p className={s['helper-text']}>Начните вводить город,
                например, <span onClick={() => pasteTheCityToInput("Ижевск")} className={s.city}>Ижевск</span></p>
            </div>
          </div>

          <div className={s['wrap-bookmarks']}>
            <p className={s.bookmarks}>Используйте значок «закладки»,
              чтобы закрепить город на главной</p>
            <FavoriteIcon />
          </div>
        </div> : null}

        {(!favorites.length && isLoading) ? <p>Загрузка...</p> : null}

      </div>
    </div>
  )
}
