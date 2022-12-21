import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
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

export default { getAll, create, setToken, updateLikes, deleteBlog };
