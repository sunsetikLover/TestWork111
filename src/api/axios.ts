import axios from 'axios'
import { Component } from 'react'
import { AxiosRequestConfig } from 'axios'
import { CITIES_API, WEATHER_API } from '@/utils'

export const weatherAxiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  baseURL: WEATHER_API,
})

export const citiesAxiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '9764761c52mshc90d508614f9472p1c70f9jsn6af5ca78f7e1',
  },
  withCredentials: true,
  baseURL: CITIES_API,
})

export class WeatherBaseService extends Component {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await weatherAxiosBase.request<T>(props)
  }
}

export class CitiesBaseService extends Component {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await citiesAxiosBase.request<T>(props)
  }
}
