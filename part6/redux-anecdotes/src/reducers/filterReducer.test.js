import filterReducer from './filterReducer';

import deepFreeze from 'deep-freeze';

describe('filter reducer', () => {
  test('returns filtered array with filterAnecdotes', () => {
    const initialState = [];
    const action = {
      type: 'filter/filterAnecdotes',
      payload: {
        anecdotes: [
          {
            content: 'If it hurts, do it more often',
            id: 1,
            votes: 0,
          },
          {
            content: 'Premature optimization is the root of all evil.',
            id: 2,
            votes: 0,
          },
        ],
        filterBy: 'hurt',
      },
    };

    deepFreeze(initialState);
    const newState = filterReducer(initialState, action);
    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual({
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 0,
    });
  });
});
