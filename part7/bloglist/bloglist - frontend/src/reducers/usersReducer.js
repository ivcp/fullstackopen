import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
import { setMessage } from './notificationReducer';

const initialState = [];

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersReducer.actions;

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getAllUsers();
      dispatch(setUsers(users));
    } catch (err) {
      dispatch(setMessage('Something went wrong', true));
    }
  };
};

export default usersReducer.reducer;
