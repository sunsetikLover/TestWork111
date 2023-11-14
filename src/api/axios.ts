import axios from 'axios'
import { Component } from 'react'
import { AxiosRequestConfig } from 'axios'

export const axiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

export class BaseService extends Component {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await axiosBase.request<T>(props)
  }
}
