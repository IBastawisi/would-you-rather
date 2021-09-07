import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const NewQuestion: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const history = useHistory()

  const [newQuestion, setNewQuestion] = useState({
    optionOne: '',
    optionTwo: '',
  })


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewQuestion({ ...newQuestion, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(actions.questions.addQuestionAsync(newQuestion))
    setNewQuestion({
      optionOne: '',
      optionTwo: '',
    })
    history.push('/')
  }

  useEffect(() => {
    if (!authedUser) {
      dispatch(actions.app.announce("Please login to add questions!"));
    }
  }, [authedUser, dispatch])

  if (!authedUser) {
    return <Redirect to="/login" />
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
        <Icon>alt_route</Icon>
      </Avatar>
      <Typography component="h1" variant="h5">
        Would You Rather
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          size="small"
          margin="dense"
          required
          fullWidth
          id="optionOne"
          label="First Option"
          name="optionOne"
          autoComplete="optionOne"
          autoFocus
          onChange={handleInput}
        />
        <TextField
          size="small"
          margin="dense"
          required
          fullWidth
          name="optionTwo"
          label="Second Option"
          id="optionTwo"
          autoComplete="optionTwo"
          onChange={handleInput}
        />
        <Button
          type="submit"
          disabled={newQuestion.optionOne === '' || newQuestion.optionTwo === ''}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Container>
  )
}

export default NewQuestion;
