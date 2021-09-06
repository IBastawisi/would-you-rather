import React, { useState } from 'react'
import { actions } from '../slices'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


const RegisterForm = () => {
  const [user, setUser] = useState({ username: '', name: '', password: '' })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response: any = await dispatch(actions.app.registerAsync(user))
    if (response.error) {
      dispatch(actions.app.announce(response.payload?.error || response.error.message))
    } else {
      setUser({ username: '', name: '', password: '' })
      history.push('/login')
    }
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"
          name='username'
          value={user.username}
          onChange={handleInput}
          placeholder="Username" />
        <input type="text"
          name='name'
          value={user.name}
          onChange={handleInput}
          placeholder="Name" />
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={handleInput}
          placeholder="Password" />

        <button type="submit" style={{ margin: 16 }}>Register</button>
      </form>
    </div>
  )
}

export default RegisterForm