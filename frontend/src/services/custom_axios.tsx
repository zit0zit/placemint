import axios from 'axios'
import { API_URL } from '../utils/const'

const axiosIntance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosIntance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token')
  if (cfg.headers && token) {
    cfg.headers['Authorization'] = token
  }
  return cfg
})

export default axiosIntance
