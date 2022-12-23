import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const User = () => {
  const { id } = useParams();
  const users = useSelector(state => state.users);
  const selectedUser = users.find(user => user.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser) {
      dispatch(initializeUsers());
    }
  }, []);

  if (!selectedUser) {
    return null;
  }

  return (
    <Container>
      <h2>{selectedUser.name}</h2>
      <p>
        <strong>added blogs:</strong>
      </p>
      <ul>
        {selectedUser.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Container>
  );
};

export default User;

//Styles

const Container = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.text};

  & ul {
    list-style: none;
    margin-top: 1rem;
  }
`;
