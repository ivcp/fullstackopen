import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return (state = action.payload);
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
