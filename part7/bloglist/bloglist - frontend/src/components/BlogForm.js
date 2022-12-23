import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import styled from 'styled-components';
import Button from '../UI/Button';

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
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
    dispatch(
      createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      })
    );
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
    toggleVisibility();
  };

  return (
    <Form onSubmit={addBlog}>
      <div>
        <Input
          id="title"
          type="text"
          value={newBlog.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          id="author"
          type="text"
          value={newBlog.author}
          name="author"
          placeholder="author"
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          placeholder="url"
          onChange={handleChange}
        />
      </div>
      <Button type="submit" id="add-blog-btn">
        add blog
      </Button>
    </Form>
  );
};

export default BlogForm;

//Styles

const Form = styled.form`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font: inherit;
`;
