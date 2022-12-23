import axios from 'axios';
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '/api/login'
    : 'https://proud-dream-5593.fly.dev/api/login';

const logIn = async credentials => {
  const user = await axios.post(baseUrl, credentials);
  return user.data;
};

export default { logIn };
