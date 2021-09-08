import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Question from './Question';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

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

  const [value, setValue] = useState(authedUser && questionIds.length > 0 ? '2' : '1');

  useEffect(() => {
    authedUser && questionIds.length > 0 ? setValue('2') : setValue('1');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authedUser])

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList centered onChange={(event, newValue) => { setValue(newValue); }}>
          <Tab label="All Questions" value="1" />
          {authedUser && questionIds.length > 0 && <Tab label="Unanswered Questions" value="2" />}
          {authedUser && questionIds.length > 0 && <Tab label="Answered Questions" value="3" />}
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ p: 0 }}>
        {questionIds.map(id => <Question key={id} id={id} />)}
        {questionIds.length === 0 && <Typography component="h3" align="center" sx={{ p: 3 }}>There's NO Questions Yet!</Typography>}
      </TabPanel>
      {authedUser && questionIds.length > 0 && <TabPanel value="2" sx={{ p: 0 }}>
        {unansweredIds.map(id => <Question key={id} id={id} />)}
        {unansweredIds.length === 0 && <Typography component="h3" align="center" sx={{ p: 3 }}>You Answered All Questions!</Typography>}
      </TabPanel>}
      {authedUser && questionIds.length > 0 && <TabPanel value="3" sx={{ p: 0 }}>
        {answeredIds.map(id => <Question key={id} id={id} />)}
        {answeredIds.length === 0 && <Typography component="h3" align="center" sx={{ p: 3 }}>NO Answers?!</Typography>}
      </TabPanel>}
    </TabContext>
  );
}

export default Dashboard;
