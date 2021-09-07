import axios from 'axios'
import { setAuthedUser } from './helpers'
const baseUrl = '/api/login'

const login = async (user: userLoginRequest) => {
  const response = await axios.post<authedUser>(baseUrl, user)
  setAuthedUser(response.data)
  return response.data
}

export { login }