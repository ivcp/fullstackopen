import React from 'react';

const BlogForm = ({ setNewBlog, newBlog, handleSubmitNewBlog }) => {
  return (
    <form onSubmit={handleSubmitNewBlog}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              title: target.value,
            })
          }
        />
      </div>
      <div>
        author
        <input
          type="password"
          value={newBlog.author}
          name="author"
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              author: target.value,
            })
          }
        />
      </div>
      <div>
        url
        <input
          type="password"
          value={newBlog.url}
          name="author"
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              url: target.value,
            })
          }
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
