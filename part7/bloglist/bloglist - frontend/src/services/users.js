import axios from 'axios';
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '/api/users'
    : 'https://proud-dream-5593.fly.dev/api/users';

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  getAllUsers,
};
