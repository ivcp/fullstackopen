import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LogInForm from './components/LogInForm';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { loginUser, setUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import User from './pages/User';
import BlogDetails from './pages/BlogDetails';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const notificationMessage = useSelector(state => state.notification.message);
  const error = useSelector(state => state.notification.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const loggedIn = () => {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>log out</button>
      </div>
    );
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} error={error} />
      {!user ? (
        <LogInForm
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      ) : (
        loggedIn()
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user && <Togglable />}
              {sortedBlogs.map(blog => (
                <Blog key={blog.id} blog={blog} user={user} />
              ))}
            </>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
};

export default App;
