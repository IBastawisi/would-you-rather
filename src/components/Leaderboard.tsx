import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';

function Leaderboard() {
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const users = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!authedUser) {
      dispatch(actions.app.announce("Please login to view leaderboard!"));
    }
  }, [authedUser, dispatch])

  if (!authedUser) {
    return <Redirect to="/login" />
  }

  const sorted = Object.keys(users)
    .sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) -
      (users[a].questions.length + Object.keys(users[a].answers).length));

  return (
    <div>
      {sorted.map(id => <h3 key={users[id].id}>
        <img
          src={users[id].avatarURL}
          alt={`Avatar of ${users[id].name}`}
          className='avatar'
        />
        {users[id].name} asked {users[id].questions.length} and answered {Object.keys(users[id].answers).length}</h3>)}

    </div>
  );
}

export default Leaderboard;
