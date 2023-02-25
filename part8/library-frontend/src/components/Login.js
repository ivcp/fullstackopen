import { useState, useEffect } from 'react';
import { LOGIN } from '../queries/queries';
import { useMutation } from '@apollo/client';

const Login = ({ show, setError, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async event => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form action="submit" onSubmit={submit}>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
