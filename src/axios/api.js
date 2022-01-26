import axios from 'axios'

const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

export default baseAxios
