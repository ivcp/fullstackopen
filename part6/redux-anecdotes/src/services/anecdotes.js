import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async content => {
  const object = { content: content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async anecdoteId => {
  const anecdote = await axios.get(`${baseUrl}/${anecdoteId}`);
  const response = await axios.put(`${baseUrl}/${anecdoteId}`, {
    content: anecdote.data.content,
    votes: anecdote.data.votes + 1,
  });
  return response.data;
};

export default { getAll, createNew, vote };
