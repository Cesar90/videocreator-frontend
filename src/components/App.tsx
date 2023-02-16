import React, { useContext } from 'react'
import { LoggedOutRouter } from '../routers/logged-out-router'
import { LoggedInRouter } from '../routers/logged-in-router'
import { AppContext } from '../context/AppContext'
import { AxiosInterceptor } from '../clientProvider/AxiosInterceptor'

export const App = () => {
  const { state } = useContext(AppContext)
  return (
    <AxiosInterceptor>
      {state.user?.token ? <LoggedInRouter /> : <LoggedOutRouter />}
    </AxiosInterceptor>
  )
}

export default App
