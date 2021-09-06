let _token: string | null = null

export const getAuthToken = () => _token;

export const setAuthToken = (newToken: string) => {
  _token = `bearer ${newToken}`
  window.localStorage.setItem(
    'authedUser', JSON.stringify(_token)
  )
}

export const clearAuthToken = () => {
  _token = null
  window.localStorage.removeItem('authedUser')
}
