import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { updateLikes, removeBlog, addComment } from '../reducers/blogReducer';
import styled from 'styled-components';
import Button from '../UI/Button';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const selectedBlog = blogs.find(blog => blog.id === id);
  const [comment, setComment] = useState('');

  if (!selectedBlog) {
    return null;
  }

  const handleUpdateLikes = () => {
    if (!user) {
      dispatch(setMessage('You must be logged in to like a blog!', true));
      return;
    }
    dispatch(
      updateLikes(
        {
          likes: selectedBlog.likes + 1,
        },
        selectedBlog.id
      )
    );
  };

  const handleRemove = () => {
    if (
      window.confirm(
        `Remove blog ${selectedBlog.title} by ${selectedBlog.author}?`
      )
    ) {
      dispatch(removeBlog(selectedBlog));
    }
  };

  const handleSubmitComment = e => {
    e.preventDefault();
    if (comment.trim() === '') return;
    dispatch(addComment({ comment }, id));
    setComment('');
  };

  let showRemoveBtn = false;
  if (user) {
    showRemoveBtn = selectedBlog.user.username === user.username;
  }

  return (
    <Container>
      <BlogContainer>
        <h2>{selectedBlog.title}</h2>
        <a href={selectedBlog.url}>{selectedBlog.url}</a>
        <div>
          {selectedBlog.likes} likes{' '}
          <Button onClick={handleUpdateLikes}>like</Button>
        </div>
        <p>added by {selectedBlog.user.name}</p>
        {showRemoveBtn && (
          <Button remove className="remove" onClick={handleRemove}>
            remove
          </Button>
        )}
      </BlogContainer>
      <CommentContainer>
        <h3>comments</h3>
        <Form onSubmit={handleSubmitComment}>
          <Input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit">add comment</Button>
        </Form>
        <ul>
          {selectedBlog.comments.length > 0 ? (
            selectedBlog.comments.map((comment, i) => {
              return <li key={i}>{comment}</li>;
            })
          ) : (
            <p>no comments yet. add one!</p>
          )}
        </ul>
      </CommentContainer>
    </Container>
  );
};

export default BlogDetails;

//styles

const Container = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.text};
`;

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  & a {
    text-decoration: none;
    color: inherit;
    text-align: center;
  }

  & div {
    text-align: center;
  }

  & button {
    margin-top: 1rem;
    align-self: flex-start;
  }
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  font: inherit;
`;

const CommentContainer = styled.div`
  margin-top: 2rem;
  & ul {
    list-style: none;
    margin-top: 1rem;
  }
`;
