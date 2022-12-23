import { useState } from 'react';
import BlogForm from './BlogForm';
import styled from 'styled-components';
import Button from '../UI/Button';

const Togglable = () => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>add new blog</Button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm toggleVisibility={toggleVisibility} />
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </Container>
  );
};

Togglable.displayName = 'Togglable';

export default Togglable;

// STYLES

const Container = styled.div`
  margin-block: 2rem;
`;
