import { useEffect } from 'react';
import Blog from './components/Blog';
import LogInForm from './components/LogInForm';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import User from './pages/User';
import BlogDetails from './pages/BlogDetails';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const notificationMessage = useSelector(state => state.notification.message);
  const error = useSelector(state => state.notification.error);

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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Navbar />
      <h2>blogs</h2>

      <Notification message={notificationMessage} error={error} />

      {!user && <LogInForm />}

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
