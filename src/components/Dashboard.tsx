import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Question from './Question';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

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

  const [value, setValue] = useState(authedUser ? '2' : '1');

  useEffect(() => {
    authedUser ? setValue('2') : setValue('1');
  }, [authedUser])

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList centered onChange={(event, newValue) => { setValue(newValue); }}>
          <Tab label="All Questions" value="1" />
          {authedUser && <Tab label="Unanswered Questions" value="2" />}
          {authedUser && <Tab label="Answered Questions" value="3" />}
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ p: 0 }}>
        {questionIds.map(id => <Question key={id} id={id} />)}
        {questionIds.length === 0 && <p>There's NO Questions Yet!</p>}
      </TabPanel>
      {authedUser && <TabPanel value="2" sx={{ p: 0 }}>
        {unansweredIds.map(id => <Question key={id} id={id} />)}
        {unansweredIds.length === 0 && <p>You Answered All Questions!</p>}
      </TabPanel>}
      {authedUser && <TabPanel value="3" sx={{ p: 0 }}>
        {answeredIds.map(id => <Question key={id} id={id} />)}
        {answeredIds.length === 0 && <p>NO Answers?!</p>}
      </TabPanel>}
    </TabContext>
  );
}

export default Dashboard;
