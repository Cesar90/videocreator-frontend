import React, { createContext, useEffect, useContext, useReducer, Dispatch } from 'react'
import { ILogin, IProfile, IResponseVideos } from '../utils/types'
import { MainAction, reducer, Types } from './Reducer'

interface IProps {
  children: React.ReactNode
}

export interface IContext2 {
  profile: IProfile
  user: ILogin
  videos: IResponseVideos[]
}

export const initialData = {
  id: 0,
  email: '',
  name: '',
  typeuser: '',
  token: '',
}

export const initialProfile: IProfile = {
  id: 0,
  name: '',
  typeuser: '',
  videos: [],
  followers: [],
  followedBy: [],
  likesVideo: [],
}

const initialState = {
  user: initialData,
  profile: initialProfile,
  videos: [],
}

export const AppContext = createContext<{
  state: IContext2
  dispatch: Dispatch<MainAction>
}>({
  state: initialState,
  dispatch: () => null,
})

export default function AppProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const userLS = localStorage.getItem('userInfoVideo')
    if (userLS) {
      dispatch({
        type: Types.LOGIN,
        payload: JSON.parse(userLS),
      })
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
const AppConsumer = AppContext.Consumer
export { AppConsumer }
export const useAppContext = () => {
  return useContext(AppContext)
}
