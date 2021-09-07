import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Question from './Question';
import Leaderboard from './Leaderboard';
import Navbar from './Navbar';
import NewQuestion from './NewQuestion';
import Announcer from './Announcer';
import NotFound from './NotFound';
import Box from '@mui/system/Box';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.app.loading)

  useEffect(() => {
    dispatch(actions.app.loadAsync())
  }, [dispatch])

  return (
    <Router basename="/would-you-rather">
      <LoadingBar />
      <Announcer />
      <Navbar />
      {loading ? <div className="spinner"></div> :
        <Box sx={{ pb: 7 }}>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/questions/:id' component={Question} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Box>
      }
    </Router>
  );
}

export default App;