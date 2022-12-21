import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setMessage, setError } from './notificationReducer';

const initialState = [];

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const blogToLike = state.find(blog => blog.id === action.payload);
      blogToLike.likes++;
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, like, deleteBlog } = blogReducer.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (err) {
      dispatch(setMessage('Not connected to server', true));
    }
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
      dispatch(
        setMessage(
          `A new blog ${newBlog.title} by ${newBlog.author} added ✔`,
          false
        )
      );
    } catch (err) {
      dispatch(setMessage(err.response.data.error, true));
      dispatch(setError(true));
    }
  };
};

export const updateLikes = (likes, id) => {
  return async dispatch => {
    try {
      const blog = await blogService.updateLikes(likes, id);
      dispatch(like(blog.id));
      dispatch(setMessage(`👍 ${blog.title}`, false));
    } catch (err) {
      let msg;
      if (err.response.status === 500) {
        msg = 'Server error';
      } else {
        msg = err.response.data.error;
      }
      dispatch(setMessage(msg, true));
    }
  };
};

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id);
      dispatch(deleteBlog(blog.id));
      dispatch(setMessage(`❌ Deleted ${blog.title} by ${blog.author}`, false));
    } catch (err) {
      let msg;
      if (err.response.status === 500) {
        msg = 'Server error';
      } else {
        msg = err.response.data.error;
      }
      dispatch(setMessage(msg, true));
    }
  };
};

export default blogReducer.reducer;
