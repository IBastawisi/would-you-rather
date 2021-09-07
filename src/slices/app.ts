import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getAuthedUser, loginService, questionService, setAuthToken, userService } from '../services';

export interface AppState {
  authedUser: authedUser | null;
  loading: boolean;
  announcement: string | null
}

const initialState: AppState = {
  authedUser: null,
  loading: true,
  announcement: null,
};

export const loadAsync = createAsyncThunk('app/load', async (_, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  const response = await Promise.all([userService.getAll(), questionService.getAll()]);
  thunkAPI.dispatch(hideLoading())
  const authedUser = getAuthedUser();
  setAuthToken(authedUser?.token);

  return { users: response[0], questions: response[1], authedUser };
});

export const loginAsync = createAsyncThunk('app/login', async (user: { username: string, password: string }, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const response = await loginService.login(user)
    return response
  } catch (err: any) {
    if (!err.response) {
      throw err
    }
    return thunkAPI.rejectWithValue(err.response.data)
  } finally {
    thunkAPI.dispatch(hideLoading())
  }});

export const registerAsync = createAsyncThunk('app/register', async (user: { username: string, password: string, name: string }, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const response = await userService.register(user)
    return response
  } catch (err: any) {
    if (!err.response) {
      throw err
    }
    return thunkAPI.rejectWithValue(err.response.data)
  } finally {
    thunkAPI.dispatch(hideLoading())
  }
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthedUser: (state, action: PayloadAction<authedUser | null>) => {
      state.authedUser = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    announce: (state, action) => {
      state.announcement = action.payload
    },
    clearAnnouncement: (state) => {
      state.announcement = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.authedUser = action.payload.authedUser;
        state.loading = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.authedUser = action.payload;
        state.announcement = `Welcome back, ${action.payload.name}`;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.announcement = 'Account created! please login to continue';
      });
  },
});

export default appSlice.reducer;