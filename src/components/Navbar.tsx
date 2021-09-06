import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearAuthToken } from '../services';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';

const Navbar: React.FC = () => {
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    clearAuthToken();
    dispatch(actions.app.setAuthedUser(null))
    dispatch(actions.app.announce('Logged out!'))
  }

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>

        {!authedUser && <li><NavLink to='/login' activeClassName='active'>Login</NavLink></li>}

        {authedUser && <li>
          <span style={{ padding: '0 1rem' }}>Welcome, {authedUser.name}</span>
          <button onClick={logout}>Logout</button>
        </li>}
      </ul>
    </nav>
  );
}

export default Navbar;
