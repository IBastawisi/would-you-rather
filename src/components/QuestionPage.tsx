import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import Question from './Question';

const QuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const question = useSelector((state: RootState) => state.questions[id])
  const dispatch = useDispatch<AppDispatch>();
  const authedUser = useSelector((state: RootState) => state.app.authedUser)

  useEffect(() => {
    if (!authedUser) {
      dispatch(actions.app.announce("Please login to view Question Details!"));
    }
  }, [authedUser, dispatch])

  if (!authedUser) {
    return <Redirect to="/login" />
  }


  if (!question) {
    return <div>Not Found</div>
  }

  let userAnswer = null;
  if (authedUser) {
    userAnswer = question.optionOne.votes.includes(authedUser.username) ? "optionOne" :
      question.optionTwo.votes.includes(authedUser.username) ? "optionTwo" : null;
  }

  return (
    <div>
      <Question id={id} />
      {userAnswer && <div>
        <p>{question.optionOne.votes.length} answered {question.optionOne.text} ({(question.optionOne.votes.length / (question.optionOne.votes.length +  question.optionTwo.votes.length) * 100).toFixed()}%)</p>
        <p>{question.optionTwo.votes.length} answered {question.optionTwo.text} ({(question.optionTwo.votes.length / (question.optionOne.votes.length +  question.optionTwo.votes.length) * 100).toFixed()}%)</p>
      </div>}
    </div>
  )
}

export default QuestionPage;
