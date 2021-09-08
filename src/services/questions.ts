import axios from 'axios'
import { getAuthToken } from './helpers';

const baseUrl = 'https://would-you-rather-server.herokuapp.com/api/questions'

const getAll = async () => {
  const response = await axios.get<question[]>(baseUrl)
  return response.data
}

const create = async (newObject: { optionOne: string, optionTwo: string }) => {
  const token = getAuthToken();
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post<question>(baseUrl, newObject, config)
  return response.data
}

const update = async (id: string, newObject: question) => {
  const token = getAuthToken();
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put<question>(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id: string) => {
  const token = getAuthToken();
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export { getAll, create, update, remove }