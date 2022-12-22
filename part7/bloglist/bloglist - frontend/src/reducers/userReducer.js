import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setMessage } from './notificationReducer';
const initialState = null;

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.logIn(credentials);
      blogService.setToken(user.token);
      dispatch(setUser(user));
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch(setMessage(`${user.name} logged in successfully`, false));
    } catch (err) {
      dispatch(setMessage('Wrong username or password', true));
    }
  };
};

export default userReducer.reducer;
