import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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

  return <>
    {sorted.map(id =>
      <Card key={users[id].id} variant="outlined" sx={{ display: 'flex', m: 2, height: 128 }}>
        <CardMedia
          component="img"
          sx={{ width: 128 }}
          image={users[id].avatarURL}
          alt={`Avatar of ${users[id].name}`}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', p: "1rem !important" }}>
            <Typography component="div" variant="subtitle2" sx={{ pb: 1 }}>{users[id].name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Asked: {users[id].questions.length}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Answered: {Object.keys(users[id].answers).length}
            </Typography>
          </CardContent>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ p: 2, m: 2, borderRadius: 3, backgroundColor: 'ButtonFace' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Score:
          </Typography>
          <Typography variant="h4" color="text.primary" component="h3">
            {users[id].questions.length + Object.keys(users[id].answers).length}
          </Typography>
        </Box>
      </Card>
    )}
  </>
}

export default Leaderboard;
