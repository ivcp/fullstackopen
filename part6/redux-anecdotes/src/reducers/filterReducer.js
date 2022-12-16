import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      if (action.payload.filterBy === '') {
        return initialState;
      }
      return action.payload.anecdotes.filter(item =>
        item.content.includes(action.payload.filterBy)
      );
    },
  },
});

export const { filterAnecdotes } = filterReducer.actions;
export default filterReducer.reducer;
