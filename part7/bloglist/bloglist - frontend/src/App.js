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
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/Glogal';
import theme from './theme/Colors';

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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Navbar />
        <Notification message={notificationMessage} error={error} />

        {!user && <LogInForm />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                {user && <Togglable />}
                <ul>
                  {sortedBlogs.map(blog => (
                    <Blog key={blog.id} blog={blog} user={user} />
                  ))}
                </ul>
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;

// Styles

const Container = styled.div`
  margin-inline: auto;
  max-width: 40rem;
  margin-top: 2rem;
`;
