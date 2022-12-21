import { useState } from 'react';
import BlogForm from './BlogForm';

const Togglable = () => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>add new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm toggleVisibility={toggleVisibility} />
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

Togglable.displayName = 'Togglable';

export default Togglable;
