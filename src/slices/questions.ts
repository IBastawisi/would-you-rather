import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { questionService } from '../services';
import { update } from '../services/questions';
import { loadAsync } from './app';

const initialState: { [key: string]: question } = {};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<{ [key: string]: question }>) => action.payload,
    addAnswer: (state, action: PayloadAction<{ question: question, answer: answer, username: string }>) => {
      const { question, answer, username } = action.payload;
      state[question.id][answer].votes.push(username);
    },
    removeAnswer: (state, action: PayloadAction<{ question: question, answer: answer, username: string }>) => {
      const { question, answer, username } = action.payload;
      let votes = state[question.id][answer].votes;
      state[question.id][answer].votes = votes.filter(id => id !== username);
    },
    add: (state, action: PayloadAction<question>) => {
      state[action.payload.id] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsync.fulfilled, (state, action) => ({
        ...action.payload.questions.reduce(
          (memo, question) => ({ ...memo, [question.id]: question }),
          {}
        ),
        ...state
      }))
  },
});

export const answerQuestionAsync = createAsyncThunk('questions/answer', async (info: { question: question, answer: answer, username: string }, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  thunkAPI.dispatch(questionsSlice.actions.addAnswer(info))

  const updatedQuestion: question = {
    ...info.question,
    [info.answer]: {
      ...info.question[info.answer],
      votes: [...info.question[info.answer].votes, info.username]
    }
  }
  const response = await update(info.question.id ,updatedQuestion);
  
  !response && thunkAPI.dispatch(questionsSlice.actions.removeAnswer(info))

  thunkAPI.dispatch(hideLoading())
  
  return info;
});

export const addQuestionAsync = createAsyncThunk('questions/add', async (newQuestion: { optionOne: string, optionTwo: string }, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  const response = await questionService.create(newQuestion);
  thunkAPI.dispatch(questionsSlice.actions.add(response))
  thunkAPI.dispatch(hideLoading())
  return response;
});

export default questionsSlice.reducer;
