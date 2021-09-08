import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../slices'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LoginForm = () => {
  const [user, setUser] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation<{ referrer: string | undefined }>()

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
      history.push(location.state?.referrer || '/')
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
          Sign in
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
            Sign In
          </Button>
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm