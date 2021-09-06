import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';

const NewQuestion: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const history = useHistory()

  const [newQuestion, setNewQuestion] = useState({
    optionOne: '',
    optionTwo: '',
  })


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div>
      <h3 className='text-center'>Would You Rather</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="first option"
          name="optionOne"
          required
          value={newQuestion.optionOne}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="second option"
          name="optionTwo"
          required
          value={newQuestion.optionTwo}
          onChange={handleChange}
        />

        <button
          type='submit'
          disabled={newQuestion.optionOne === '' || newQuestion.optionTwo === ''}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewQuestion;
