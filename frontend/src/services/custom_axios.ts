import axios from 'axios'
import { API_URL } from '../utils/const'

const axiosIntance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosIntance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token')
  if (cfg.headers) {
    cfg.headers['Authorization'] = `${token && JSON.parse(token)}`
  }
  return cfg
})

export default axiosIntance
