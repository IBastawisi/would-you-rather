import axios from 'axios'
const baseUrl = 'https://would-you-rather-server.herokuapp.com/api/users'

const getAll = async ()  => {
  const response = await axios.get<user[]>(baseUrl)
  return response.data
}


const register = async (user: userRegisterRequest) => {
  const response = await axios.post<user>(baseUrl, user)
  return response.data
}

export { getAll, register }