import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import { formatDate } from '../utils/helpers';

const Question: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory()
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const question = useSelector((state: RootState) => state.questions[id])
  const questionAuthor = useSelector((state: RootState) => state.users[question.author])

  let userAnswer: answer | null = null;
  if (authedUser) {
    userAnswer = question.optionOne.votes.includes(authedUser.username) ? "optionOne" :
      question.optionTwo.votes.includes(authedUser.username) ? "optionTwo" : null;
  }

  const handleAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (authedUser) {
      const answer = e.currentTarget.value as answer;
      await dispatch(actions.questions.answerQuestionAsync({ question, answer, username: authedUser.username }))
      history.push(`/questions/${id}`)
    } else {
      dispatch(actions.app.announce("Please login to vote!"))
      history.push('/login')
    }
  }

  return (
    <Link className='question' to={`/questions/${id}`}>
      <img
        src={questionAuthor.avatarURL}
        alt={`Avatar of ${questionAuthor.name}`}
        className='avatar'
      />
      <div className='question-info'>
        <div>
          <span>{questionAuthor.name}</span>
          <div>{formatDate(question.timestamp)}</div>
          {userAnswer ? <div>You answered {question[userAnswer].text}</div> : <div>
            <button value="optionOne" className={userAnswer === "optionOne" ? 'active' : ''} onClick={handleAnswer}>{question.optionOne.text}</button>
            <button value="optionTwo" className={userAnswer === "optionTwo" ? 'active' : ''} onClick={handleAnswer}>{question.optionTwo.text}</button>
          </div>}
        </div>
      </div>
    </Link>
  );
}

export default Question;
