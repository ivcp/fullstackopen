import { useState } from 'react';
import blogsService from '../services/blogs';
import notify from '../helpers/notification';

const Blog = ({
  blog,
  setUserAction,
  user,
  setNotificationMessage,
  setError,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const button = showDetails ? 'hide' : 'view';

  const handleUpdateLikes = async () => {
    if (!user) {
      notify(
        setNotificationMessage,
        'You must be logged in to like a blog!',
        setError,
        false
      );
      return;
    }
    try {
      await blogsService.updateLikes(
        {
          likes: blog.likes + 1,
        },
        blog.id
      );
      setUserAction(prev => prev + 1);
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

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogsService.deleteBlog(blog.id);
        setUserAction(prev => prev + 1);
      } catch (exception) {
        if (exception.response.status === 500) {
          setNotificationMessage('Not connected to server');
        } else {
          setNotificationMessage(exception.response.data.error);
        }
        setError(true);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      }
    }
  };

  let showRemoveBtn = false;
  if (user) {
    showRemoveBtn = blog.user.username === user.username;
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>{button}</button>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleUpdateLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {showRemoveBtn && (
            <button className="remove" onClick={handleRemove}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
