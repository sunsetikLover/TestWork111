import axios, { AxiosRequestConfig } from 'axios';
import { Component } from 'react';

const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API;
const CITIES_API = process.env.NEXT_PUBLIC_CITIES_API;
const CITIES_API_KEY = process.env.NEXT_PUBLIC_CITIES_API_KEY;
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const weatherAxiosBase = axios.create({
  baseURL: WEATHER_API,
  params: {
    appid: WEATHER_API_KEY,
  },
});

export const citiesAxiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': CITIES_API_KEY,
  },
  withCredentials: true,
  baseURL: CITIES_API,
});

export class WeatherBaseService extends Component {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await weatherAxiosBase.request<T>(props);
  }
}

export class CitiesBaseService extends Component {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await citiesAxiosBase.request<T>(props);
  }
}
