import axios from 'axios'

const baseURL = 'https://video-creator-backend.herokuapp.com/api'

const AxiosInstance = axios.create({
  baseURL,
})

AxiosInstance.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem('userInfoVideo')

    if (user) {
      config.headers = {
        authorization: `Bearer ${JSON.parse(user).token}`,
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default AxiosInstance
