"use client"

import { ArrowIcon, FavoriteIcon } from '@/icons'
import s from './search-city.module.scss'
import React, { useEffect, useState } from 'react'
import { useDebounce, useOutsideClick } from '@/hooks'
import { useRouter } from 'next/navigation'
import { StorageCities } from '../storage-cities/storage-cities'
import Highlighter from "react-highlight-words";
import { CitiesService } from '@/services'
import { CitiesTypes } from '@/types'

export const SearchCity = () => {
  const [valueCity, setValueCity] = useState('')
  const debouncedValue = useDebounce<string>(valueCity, 500)
  const [filteredCities, setFilteredCities] = useState<CitiesTypes | null>(null)
  const [isShowListOfCities, setIsShowListOfCities] = useState(false)
  const [favorites, setFavorites] = useState<[]>([])
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const { push } = useRouter()

  const refList = useOutsideClick(() => {
    setIsShowListOfCities(false)
  });

  const focusOnInput = () => {
    if (debouncedValue.length >= 3) {
      setIsShowListOfCities(true)
    }
  }

  const getCities = async () => {
    try {
      setIsLoadingCities(true)
      const { data: cities } = await CitiesService.getCitiesByFilters(debouncedValue)
      setFilteredCities(cities)
    } catch { }
    finally {
      setIsLoadingCities(false)
    }
  }

  useEffect(() => {
    setFilteredCities(null)

    if (debouncedValue.length >= 3) {
      setIsShowListOfCities(true)
      getCities()
    } else {
      setIsShowListOfCities(false)
    }
  }, [debouncedValue]);

  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites") || '[]') || []

    setFavorites(existingFavorites)
    setIsLoadingFavorites(false)
  }, [])

  return (
    <div className={s.wrap}>
      <div className='container'>
        <div className={s['wrap-input']} ref={refList}>
          <input onFocus={focusOnInput} value={valueCity} onChange={(e) => setValueCity(e.target.value)} className={s.input} placeholder='Укажите город' type="text" />
          <div className={s.list}>
            {(isShowListOfCities && filteredCities?.data.length && debouncedValue.length >= 3) ? filteredCities.data.map(({ city, id }) => (
              <div className={s['highlight-wrap']} onClick={() => push(`cities/${city}`)} key={id}>
                <Highlighter
                  searchWords={[debouncedValue.trim()]}
                  autoEscape={true}
                  className={s.highlight}
                  highlightStyle={{ color: 'white', backgroundColor: 'transparent' }}
                  textToHighlight={city}
                />
              </div>
            )
            ) : null}

            {isLoadingCities && <p className={s['city-helper']}>Загрузка...</p>}

            {(!isLoadingCities && isShowListOfCities && !filteredCities?.data.length) && <p className={s['city-helper']}>Ничего не найдено</p>}

          </div>
        </div>

        {favorites.length ? <StorageCities favorites={favorites} /> : null}

        {(!favorites.length && !isLoadingFavorites) ? <div>
          <div className={s['helper-wrap']}>
            <div className={s['helper-wrap-inner']}>
              <div className={s.icon}>
                <ArrowIcon />
              </div>
              <p className={s['helper-text']}>Начните вводить город,
                например, <span onClick={() => setValueCity('Ижевск')} className={s.city}>Ижевск</span></p>
            </div>
          </div>

          <div className={s['wrap-bookmarks']}>
            <p className={s.bookmarks}>Используйте значок «закладки»,
              чтобы закрепить город на главной</p>
            <FavoriteIcon />
          </div>
        </div> : null}

        {(!favorites.length && isLoadingFavorites) ? <p>Загрузка...</p> : null}

      </div>
    </div>
  )
}
