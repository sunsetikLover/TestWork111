'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Header } from '@/components';
import { useShallow } from 'zustand/react/shallow';
import { ArrowIcon } from '@/icons';
import { useDebounce, useOutsideClick } from '@/hooks';
import { useSearchCitiesStore } from '@/store';

import s from './home.module.scss';

export const Home = () => {
  const [isShowListOfCities, setIsShowListOfCities] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchResults, isLoading, fetchSearchResults } = useSearchCitiesStore(
    useShallow((state) => ({
      searchResults: state.searchResults,
      isLoading: state.isLoading,
      fetchSearchResults: state.fetchSearchResults,
    })),
  );

  const debouncedValue = useDebounce<string>(searchQuery, 500);
  const { push } = useRouter();

  const refList = useOutsideClick(() => setIsShowListOfCities(false));

  const focusOnInput = () => {
    if (debouncedValue.length >= 3) {
      setIsShowListOfCities(true);
    }
  };

  const redirectToWeatherCard = (city: string) => {
    push(`cities/${city}`);
  };

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      setIsShowListOfCities(true);
      fetchSearchResults(searchQuery);
    } else {
      setIsShowListOfCities(false);
    }
  }, [debouncedValue, fetchSearchResults, searchQuery]);

  useEffect(() => {
    setIsShowListOfCities(false);
    setSearchQuery('');
  }, [setSearchQuery]);

  const renderSearchResults = () => {
    if (isLoading) {
      return <p className={s['city-helper']}>Загрузка...</p>;
    }
    if (!isLoading && isShowListOfCities && !searchResults?.data.length) {
      return <p className={s['city-helper']}>Ничего не найдено</p>;
    }
    if (
      isShowListOfCities &&
      searchResults?.data.length &&
      debouncedValue.length >= 3
    ) {
      const uniqueCities = Array.from(
        new Map(searchResults.data.map((item) => [item.city, item])).values(),
      );

      return uniqueCities.map(({ city, id }) => (
        <div
          className={s['highlight-wrap']}
          onClick={() => redirectToWeatherCard(city)}
          key={id}
        >
          <Highlighter
            searchWords={[debouncedValue.trim()]}
            autoEscape={true}
            className={s.highlight}
            highlightStyle={{ color: 'white', backgroundColor: 'transparent' }}
            textToHighlight={city}
          />
        </div>
      ));
    }
    return null;
  };

  return (
    <>
      <Header />

      <div className={s.wrap}>
        <div className="container">
          <div className={s['wrap-input']} ref={refList}>
            <input
              onFocus={focusOnInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={s.input}
              placeholder="Укажите город"
              type="text"
            />

            <div className={s.list}>{renderSearchResults()}</div>
          </div>

          <div className={s['helper-wrap']}>
            <div className={s['helper-wrap-inner']}>
              <div className={s.icon}>
                <ArrowIcon />
              </div>
              <p className={s['helper-text']}>
                Начните вводить город, например,{' '}
                <span
                  onClick={() => setSearchQuery('Ижевск')}
                  className={s.city}
                >
                  Ижевск
                </span>
              </p>
            </div>
          </div>

          <div className={s['wrap-link']}>
            <Link className={s.link} href="/favorites">
              <button type="button" className="btn btn-primary">
                Избранные города
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
