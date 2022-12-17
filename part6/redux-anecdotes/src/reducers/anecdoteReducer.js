import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE': {
      const anecdoteToUpvote = state.find(a => a.id === action.data.id);
      const upvotedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1,
      };
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : upvotedAnecdote
      );
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.data];
    }
    case 'SET_ANECDOTES': {
      return action.data;
    }

    default:
      return state;
  }
};

export const vote = id => {
  return {
    type: 'VOTE',
    data: {
      id,
    },
  };
};

export const addAnecdote = anecdote => {
  return {
    type: 'ADD_ANECDOTE',
    data: anecdote,
  };
};

export const setAnecdotes = anecdotes => {
  return {
    type: 'SET_ANECDOTES',
    data: anecdotes,
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newNote));
  };
};

export const voteAnecdote = id => {
  return async dispatch => {
    const newNote = await anecdoteService.vote(id);
    dispatch(vote(newNote.id));
  };
};

export default reducer;
