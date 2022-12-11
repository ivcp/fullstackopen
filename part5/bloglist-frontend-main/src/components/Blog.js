import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, removeBlog, user, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const button = showDetails ? 'hide' : 'view';

  const handleUpdateLikes = () => {
    updateLikes(blog);
  };

  const handleRemove = () => {
    removeBlog(blog);
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
  removeBlog: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired,
};

export default Blog;
