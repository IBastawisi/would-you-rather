import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../slices'
import { Link, useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [user, setUser] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response: any = await dispatch(actions.app.loginAsync(user))
    if (response.error) {
      dispatch(actions.app.announce(response.payload?.error || response.error.message))
    } else {
      setUser({ username: '', password: '' })
      history.push('/')
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"
          name='username'
          value={user.username}
          onChange={handleInput}
          placeholder="Username" />
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={handleInput}
          placeholder="Password" />

        <button type="submit" style={{ margin: 16 }}>Login</button>
        <div>
          <span>Don't have account?</span>
          <Link to='/register' style={{ margin: 16 }}>Register</Link>/
        </div>
      </form>
    </div>
  )
}

export default LoginForm