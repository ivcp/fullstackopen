import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return (state = action.payload);
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { set, removeNotification } = notificationReducer.actions;

let timerID;

export const setNotification = (message, seconds) => {
  return async dispatch => {
    clearTimeout(timerID);
    timerID = setTimeout(() => dispatch(removeNotification()), seconds * 1000);
    dispatch(set(message));
  };
};

export default notificationReducer.reducer;
