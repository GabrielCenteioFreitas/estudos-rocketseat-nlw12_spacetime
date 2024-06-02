import axios from 'axios'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3333'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://rocketseat-nlw12-backend.vercel.app'
}

export const api = axios.create({
  baseURL
})