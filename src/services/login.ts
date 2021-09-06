import axios from 'axios'
import { setAuthToken } from './helpers'
const baseUrl = '/api/login'

const login = async (user: userLoginRequest) => {
  const response = await axios.post<authedUser>(baseUrl, user)
  setAuthToken(response.data.token)
  return response.data
}

export { login }