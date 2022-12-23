import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import styled from 'styled-components';

const Navbar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  return (
    <Nav>
      <List>
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
      </List>
      <LoggedIn>
        {user && <em> {user.name} logged in</em>}
        {user && <button onClick={handleLogOut}>log out</button>}
      </LoggedIn>
    </Nav>
  );
};

export default Navbar;

//Styles

const Nav = styled.nav`
  position: relative;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  padding-block: 1rem;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    display: block;
    background-color: ${({ theme }) => theme.text};
    width: 6rem;
    height: 6rem;
    top: -1rem;
    left: -1.5rem;
    border-radius: 50%;
    transform: rotate(45deg);
    z-index: 2;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  & a {
    margin-left: 1rem;
    text-decoration: none;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    position: relative;
    z-index: 5;
  }

  & li:first-of-type {
    & > a {
      color: ${({ theme }) => theme.primary};
    }
  }

  & a:hover {
    text-decoration: underline;
  }
`;

const LoggedIn = styled.div`
  color: ${({ theme }) => theme.text};

  & button {
    margin-inline: 1rem;
    border: none;
    background-color: inherit;
    color: inherit;
    font: inherit;
    cursor: pointer;
    font-size: 1.2rem;
  }

  & button:hover {
    text-decoration: underline;
  }
`;
