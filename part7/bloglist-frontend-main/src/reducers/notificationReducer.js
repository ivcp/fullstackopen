import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  error: false,
};

// let timerId;

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.message = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    removeNotitification() {
      return initialState;
    },
  },
});

export const { setError, addMessage, removeNotitification } =
  notificationReducer.actions;

let timerId;
export const setMessage = message => {
  return async dispatch => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      dispatch(removeNotitification());
    }, 5000);
    dispatch(addMessage(message));
  };
};

export default notificationReducer.reducer;
