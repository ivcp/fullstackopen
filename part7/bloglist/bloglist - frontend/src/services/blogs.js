import axios from 'axios';
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '/api/blogs'
    : 'https://proud-dream-5593.fly.dev/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateLikes = async (likesObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${id}`;
  const updatedBlog = await axios.put(url, likesObject, config);
  return updatedBlog.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${id}`;
  await axios.delete(url, config);
};

const addComment = async (commentObject, id) => {
  const url = `${baseUrl}/${id}/comments`;
  const updatedBlog = await axios.post(url, commentObject);
  return updatedBlog.data;
};

export default {
  getAll,
  create,
  setToken,
  updateLikes,
  deleteBlog,
  addComment,
};
