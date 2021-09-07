import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { clearAuthedUser } from '../services';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Icon from '@mui/material/Icon';


const Navbar: React.FC = () => {
  const authedUser = useSelector((state: RootState) => state.app.authedUser)
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    clearAuthedUser();
    dispatch(actions.app.setAuthedUser(null))
    dispatch(actions.app.announce('Logged out!'))
  }

  const location = useLocation();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component={NavLink}
          to="/"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
        >
          Would You Rather
        </Typography>
        {authedUser ? <>
          <Typography
            component="span"
            variant="subtitle2"
            color="inherit"
            noWrap
            sx={{ px: 1 }}
          >
            Welcome, {authedUser.name}
          </Typography>
          <Button onClick={logout}>Logout</Button>
        </> :
          <Button component={NavLink} to="/login" variant="outlined" size="small">
            Login
          </Button>}

      </Toolbar>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 3 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={location.pathname}
        >
          <BottomNavigationAction value="/" component={NavLink} to="/" label="Home" icon={<Icon>dashboard</Icon>} />
          <BottomNavigationAction value="/add" component={NavLink} to="/add" label="Add" icon={<Icon>add</Icon>} />
          <BottomNavigationAction value="/leaderboard" component={NavLink} to="/leaderboard" label="Leaderboard" icon={<Icon>leaderboard</Icon>} />
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  )
}

export default Navbar;
