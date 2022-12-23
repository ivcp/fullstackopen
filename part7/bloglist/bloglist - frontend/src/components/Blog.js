import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Blog = ({ blog }) => {
  return (
    <List>
      <Link to={`blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </List>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

// Styles

const List = styled.li`
  list-style: none;
  margin-bottom: 1rem;

  & a {
    text-decoration: none;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text};
  }

  & a:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
