import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { updateLikes, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const button = showDetails ? 'hide' : 'view';

  const handleUpdateLikes = () => {
    if (!user) {
      dispatch(setMessage('You must be logged in to like a blog!', true));

      return;
    }
    dispatch(
      updateLikes(
        {
          likes: blog.likes + 1,
        },
        blog.id
      )
    );
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  let showRemoveBtn = false;
  if (user) {
    showRemoveBtn = blog.user.username === user.username;
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>{button}</button>
      {showDetails && (
        <>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default Blog;
