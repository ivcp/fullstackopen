import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <Container>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.length > 0 &&
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;

//Styles

const Container = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.text};
`;

const Table = styled.table`
  & td {
    border: 1px solid ${({ theme }) => theme.text};
    padding: 1rem;
    text-align: right;
    & a {
      color: inherit;
      text-decoration: none;
    }
  }
`;
