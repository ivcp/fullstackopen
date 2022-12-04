import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LogInForm from './components/LogInForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import notify from './helpers/notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [error, setError] = useState(false);
  const [userAction, setUserAction] = useState(0);

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, [userAction]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.logIn({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      notify(
        setNotificationMessage,
        `${user.name} logged in successfully`,
        setError,
        false
      );
    } catch (exception) {
      notify(
        setNotificationMessage,
        'Wrong username or password',
        setError,
        true
      );
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async newBlogObject => {
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      notify(
        setNotificationMessage,
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added ✔`,
        setError,
        false
      );
    } catch (exception) {
      notify(
        setNotificationMessage,
        exception.response.data.error,
        setError,
        true
      );
    }
  };

  const loggedIn = () => {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>log out</button>
      </div>
    );
  };

  const blogFormRef = useRef();

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

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
      {user && (
        <Togglable buttonLabel="add new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setUserAction={setUserAction}
          setNotificationMessage={setNotificationMessage}
          setError={setError}
        />
      ))}
    </div>
  );
};

export default App;
