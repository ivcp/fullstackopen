import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LogInForm from './components/LogInForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import notify from './helpers/notification';

//TODO: one user one like?

const App = () => {
  const [blogs, setBlogs] = useState([]);
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

  const updateLikes = async blog => {
    if (!user) {
      notify(
        setNotificationMessage,
        'You must be logged in to like a blog!',
        setError,
        true
      );
      return;
    }
    try {
      const updatedBlog = await blogService.updateLikes(
        {
          likes: blog.likes + 1,
        },
        blog.id
      );
      const updatedBlogArray = blogs.map(b =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      setBlogs(updatedBlogArray);
      notify(
        setNotificationMessage,
        `👍 ${updatedBlog.title}`,
        setError,
        false
      );
    } catch (exception) {
      let msg;
      if (exception.response.status === 500) {
        msg = 'Not connected to server';
      } else {
        msg = exception.response.data.error;
      }
      notify(setNotificationMessage, msg, setError, true);
    }
  };

  const removeBlog = async blogToDelete => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.deleteBlog(blogToDelete.id);
        const updatedBlogArray = blogs.filter(b => b.id !== blogToDelete.id);
        setBlogs(updatedBlogArray);
        notify(
          setNotificationMessage,
          `❌ Deleted ${blogToDelete.title} by ${blogToDelete.author}`,
          setError,
          false
        );
      } catch (exception) {
        let msg;
        if (exception.response.status === 500) {
          msg = 'Not connected to server';
        } else {
          msg = exception.response.data.error;
        }
        notify(setNotificationMessage, msg, setError, true);
      }
    }
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
          updateLikes={updateLikes}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
