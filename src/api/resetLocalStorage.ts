import { initialData } from '../context/AppContext'

const resetLocalStorage = () => {
  localStorage.removeItem('userInfoVideo')
  localStorage.setItem('userInfoVideo', JSON.stringify(initialData))
}

export { resetLocalStorage }
