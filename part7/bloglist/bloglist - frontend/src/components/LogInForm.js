import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import styled from 'styled-components';
import Button from '../UI/Button';

const LogInForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <Container>
      <form onSubmit={handleLogin}>
        <div>
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" id="login-btn">
          log in
        </Button>
      </form>
    </Container>
  );
};

export default LogInForm;

//Styles

const Container = styled.div`
  margin-block: 2rem;
  text-align: right;
`;

const Input = styled.input`
  font: inherit;
`;
