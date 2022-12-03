import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LogInForm from './components/LogInForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

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
      setNotificationMessage(`${user.name} logged in successfully`);
      setError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Wrong username or password');
      setError(true);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async e => {
    e.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
      setNotificationMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added ✔`
      );
      setError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setNotificationMessage(exception.response.data.error);
      setError(true);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
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
        <BlogForm
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          handleSubmitNewBlog={addBlog}
        />
      )}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
