import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const Navbar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">blogs</Link>
        </li>

        <li>
          <Link to="/users">users</Link>
        </li>

        {user && <em> {user.name} logged in</em>}
        {user && <button onClick={handleLogOut}>log out</button>}
      </ul>
    </nav>
  );
};

export default Navbar;
