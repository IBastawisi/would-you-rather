import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAsync, registerAsync } from './app';
import { addQuestionAsync, answerQuestionAsync } from './questions';

const initialState: { [key: string]: user } = {};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<{ [key: string]: user }>) => action.payload,
    add: (state, action: PayloadAction<user>) => { state[action.payload.username] = action.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsync.fulfilled, (state, action) => ({
        ...action.payload.users.reduce(
          (memo, user) => ({ ...memo, [user.username]: user }),
          {}
        ),
        ...state
      }))
      .addCase(addQuestionAsync.fulfilled, (state, action) => {
        state[action.payload.author].questions.push(action.payload.id)
      })
      .addCase(answerQuestionAsync.fulfilled, (state, action) => {
        state[action.payload.username].answers[action.payload.question.id] = action.payload.answer
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state[action.payload.username] = action.payload
      });
  },

});


export default usersSlice.reducer;
