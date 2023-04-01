import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://messagerapp.onrender.com'
})

export default instance