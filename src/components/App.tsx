import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { setAuthToken } from '../services';
import Leaderboard from './Leaderboard';
import Navbar from './Navbar';
import NewQuestion from './NewQuestion';
import Announcer from './Announcer';
import QuestionPage from './QuestionPage';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const loading = useSelector((state: RootState) => state.app.loading)

  useEffect(() => {
    dispatch(actions.app.loadAsync())
  }, [dispatch])

  useEffect(() => {
    if (authedUser) {
      setAuthToken(authedUser.token);
    }
  }, [authedUser])

  return (
    <Router basename="/would-you-rather">
      <>
        <LoadingBar />
        <Announcer />
        {loading ? <div className="spinner"></div> :
          <div className='container'>
            <Navbar />
            <Route path='/' exact component={Dashboard} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/questions/:id' component={QuestionPage} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={Leaderboard} />
          </div>}
      </>
    </Router>
  );
}

export default App;