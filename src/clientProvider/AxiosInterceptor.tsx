import React, { FC } from 'react'
import { resetLocalStorage } from '../api/resetLocalStorage'
import axios from 'axios'

const AxiosInterceptor: FC = ({ children }) => {
  axios.interceptors.request.use(
    async (config) => {
      const user = localStorage.getItem('userInfoVideo')

      if (user) {
        config.headers = {
          authorization: `Bearer ${JSON.parse(user).token}`,
        }
      }
      return config
    },
    (error) => {
      console.log(error)
      resetLocalStorage()
      Promise.reject(error)
    },
  )
  return <>{children}</>
}

export { AxiosInterceptor }
