import axios from 'axios';
const baseUrl = '/api/login';

const logIn = async credentials => {
  const user = await axios.post(baseUrl, credentials);
  return user.data;
};

export default { logIn };
