import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  error: false,
};

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    removeNotitification() {
      return initialState;
    },
  },
});

export const { setError, addMessage, removeNotitification } =
  notificationReducer.actions;

let timerId;
export const setMessage = (message, error) => {
  return async dispatch => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      dispatch(removeNotitification());
    }, 5000);
    dispatch(addMessage({ message, error }));
  };
};

export default notificationReducer.reducer;
