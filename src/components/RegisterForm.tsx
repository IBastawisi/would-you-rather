import React, { useState } from 'react'
import { actions } from '../slices'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Icon>how_to_reg</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            size="small"
            margin="dense"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleInput}
          />
          <TextField
            size="small"
            margin="dense"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={handleInput}
          />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id="avatarURL"
            label="Avatar URL"
            name="avatarURL"
            autoComplete="avatarURL"
            onChange={handleInput}
          />
          <TextField
            size="small"
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
    // <div className="form-container">
    //   <h2>Register</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text"
    //       name='username'
    //       value={user.username}
    //       onChange={handleInput}
    //       placeholder="Username" />
    //     <input type="text"
    //       name='name'
    //       value={user.name}
    //       onChange={handleInput}
    //       placeholder="Name" />
    //     <input
    //       name="password"
    //       type="password"
    //       value={user.password}
    //       onChange={handleInput}
    //       placeholder="Password" />

    //     <button type="submit" style={{ margin: 16 }}>Register</button>
    //   </form>
    // </div>
  )
}

export default RegisterForm