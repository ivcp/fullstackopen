import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleChange = ({ target }) => {
    setNewBlog({
      ...newBlog,
      [target.name]: target.value,
    });
  };

  const addBlog = e => {
    e.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id="title"
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit" id="add-blog-btn">
        add blog
      </button>
    </form>
  );
};

export default BlogForm;
