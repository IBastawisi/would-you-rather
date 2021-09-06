import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Question from './Question';

function Dashboard() {
  const questionIds = useSelector((state: RootState) => Object.keys(state.questions)
    .sort((a, b) => state.questions[b].timestamp - state.questions[a].timestamp))

  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const users = useSelector((state: RootState) => state.users)

  let unansweredIds = questionIds;
  let answeredIds: string[] = [];

  if (authedUser) {
    answeredIds = Object.keys(users[authedUser.username].answers);
    unansweredIds = unansweredIds.filter(id => !answeredIds.includes(id))
  }

  return (
    <div>
      <h3 className='text-center'>Would You Rather</h3>
      {authedUser ?
        questionIds.length === 0 ? <p>There's NO Questions Yet!</p> : <>
          <h3>{authedUser.name}</h3>
          <h4>Unanswered Questions</h4>
          {unansweredIds.map(id => <Question key={id} id={id} />)}
          {unansweredIds.length === 0 && <p>You Answered All Questions!</p>}
          <h4>Answered Questions</h4>
          {answeredIds.map(id => <Question key={id} id={id} />)}
          {answeredIds.length === 0 && <p>NO Answers?!</p>}
        </>
        :
        <>
          <h4>All questions</h4>
          {questionIds.map(id => <Question key={id} id={id} />)}
        </>
      }
    </div>
  );
}

export default Dashboard;
