import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { updateLikes, removeBlog, addComment } from '../reducers/blogReducer';

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
    <div>
      <h2>{selectedBlog.title}</h2>
      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <div>
        {selectedBlog.likes} likes
        <button onClick={handleUpdateLikes}>like</button>
      </div>
      <p>added by {selectedBlog.user.name}</p>
      {showRemoveBtn && (
        <button className="remove" onClick={handleRemove}>
          remove
        </button>
      )}
      <div>
        <h3>comments</h3>
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {selectedBlog.comments.length > 0 ? (
            selectedBlog.comments.map((comment, i) => {
              return <li key={i}>{comment}</li>;
            })
          ) : (
            <p>no comments yet. add one!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
