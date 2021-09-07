import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { actions } from '../slices';
import { AppDispatch, RootState } from '../store';
import { formatDate } from '../utils/helpers';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Question: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory()
  const params = useParams<{ id: string }>();
  if (params.id) id = params.id;

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
    <Link className='question' to={`/questions/${id}`} style={{cursor: params.id? "auto": "pointer"}}>
      <Card sx={{ m: 2 }} variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              src={questionAuthor.avatarURL}
              alt={`Avatar of ${questionAuthor.name}`}
            >
            </Avatar>
          }
          title={questionAuthor.name}
          subheader={formatDate(question.timestamp)}
        />
        <CardContent>
          <Typography variant="h5" textAlign="center">Would You Rather</Typography>
        </CardContent>
        <Collapse in={userAnswer !== null} timeout="auto" unmountOnExit>
          {userAnswer && <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <VoteDetails text={question.optionOne.text} votes={question.optionOne.votes.length} totalVotes={question.optionOne.votes.length + question.optionTwo.votes.length} active={userAnswer === "optionOne"} />
              <VoteDetails text={question.optionTwo.text} votes={question.optionTwo.votes.length} totalVotes={question.optionOne.votes.length + question.optionTwo.votes.length} active={userAnswer === "optionTwo"} />
            </Box>
          </CardContent>}
        </Collapse>
        {!userAnswer && <CardActions>
          <Button fullWidth variant="outlined" value="optionOne" sx={{ height: "5rem" }} onClick={handleAnswer}>{question.optionOne.text}</Button>
          <Button fullWidth variant="outlined" value="optionTwo" sx={{ height: "5rem" }} onClick={handleAnswer}>{question.optionTwo.text}</Button>
        </CardActions>}
      </Card>
    </Link >
  );
}

const VoteDetails: React.FC<{ text: string, votes: number, totalVotes: number, active?: boolean }> = ({ text, votes, totalVotes, active }) => {
  return (
    <Button fullWidth variant="outlined" value="optionOne" sx={{ p: 3, m: 1, alignItems: "flex-start", cursor: "auto" }} startIcon={active && <Icon sx={{ fontSize: "2rem !important"}}>task_alt</Icon>}>
      <Box display="flex" flexDirection="column" flex={1} alignItems="center">
        <Typography>{text}</Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex', margin: 2 }}>
          <CircularProgress variant="determinate" value={votes / totalVotes * 100} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(votes / totalVotes * 100)}%`}
            </Typography>
          </Box>
        </Box>
        <Typography>{votes} out of {totalVotes} votes</Typography>
      </Box>

    </Button>

  );
}

export default Question;
