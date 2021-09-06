import { loadingBarReducer } from "react-redux-loading-bar";
import { appSlice, loadAsync, loginAsync, registerAsync } from "./app";
import { questionsSlice, addQuestionAsync, answerQuestionAsync } from "./questions";
import { usersSlice } from "./users";
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const actions = {
  app: {
    ...appSlice.actions,
    loadAsync,
    loginAsync,
    registerAsync,
    showLoading,
    hideLoading,
  },
  users: usersSlice.actions,
  questions: { ...questionsSlice.actions, addQuestionAsync, answerQuestionAsync },

};

export const reducers = {
  app: appSlice.reducer,
  users: usersSlice.reducer,
  questions: questionsSlice.reducer,
  loadingBar: loadingBarReducer,
}

export default reducers;
