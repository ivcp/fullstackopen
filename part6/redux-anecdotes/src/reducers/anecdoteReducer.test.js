import reducer from './anecdoteReducer';
import deepFreeze from 'deep-freeze';

describe('anecdote reducer', () => {
  const initialState = [
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
  ];

  test('vote for anecdote', () => {
    const action = {
      type: 'VOTE',
      data: {
        id: 1,
      },
    };

    deepFreeze(initialState);
    const newState = reducer(initialState, action);
    expect(newState[0].votes).toBe(1);
  });

  test('add new anecdote', () => {
    const action = {
      type: 'ADD_ANECDOTE',
      data: {
        content: 'Brand new anecdote',
        id: 3,
        votes: 0,
      },
    };

    deepFreeze(initialState);
    const newState = reducer(initialState, action);
    expect(newState).toHaveLength(3);
    expect(newState).toContainEqual({
      content: 'Brand new anecdote',
      id: 3,
      votes: 0,
    });
  });
});
