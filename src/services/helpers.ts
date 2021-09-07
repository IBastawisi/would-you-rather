let _token: string | null = null

export const getAuthToken = () => _token;

export const setAuthToken = (token: string | undefined) => {
  _token = token ? `bearer ${token}` : null
}

export const getAuthedUser = () => {
  const authedUserJSON = window.localStorage.getItem('authedUser')
  const authedUser: authedUser | null = authedUserJSON && JSON.parse(authedUserJSON);
  return authedUser
}

export const setAuthedUser = (user: authedUser) => {
  _token = `bearer ${user.token}`
  window.localStorage.setItem(
    'authedUser', JSON.stringify(user)
  )
}

export const clearAuthedUser = () => {
  _token = null
  window.localStorage.removeItem('authedUser')
}
