import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'test title',
  author: 'tester',
  url: 'www.test.com',
  likes: 5,
  user: {
    name: 'Ivo',
  },
};
const mockUpdateLikes = jest.fn();
const mockRemoveBlog = jest.fn();

describe('Blog', () => {
  test('renders title and author by default, but not url and likes', () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateLikes={mockUpdateLikes}
        removeBlog={mockRemoveBlog}
      />
    );

    const blogElement = screen.getByText(/test title/i);
    expect(blogElement).toHaveTextContent('test title tester');
    const urlElement = container.querySelector('.blog-url');
    expect(urlElement).toBeNull();
    const likesElement = container.querySelector('.blog-likes');
    expect(likesElement).toBeNull();
  });

  test('url and likes are shown when the view button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Blog
        blog={blog}
        updateLikes={mockUpdateLikes}
        removeBlog={mockRemoveBlog}
      />
    );

    const viewBtn = screen.getByRole('button', { name: 'view' });
    await user.click(viewBtn);
    const urlElement = screen.getByText('www.test.com');
    expect(urlElement).toBeInTheDocument();
    const likesElement = screen.getByText('likes 5');
    expect(likesElement).toBeInTheDocument();
  });

  test('when like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup();
    render(
      <Blog
        blog={blog}
        updateLikes={mockUpdateLikes}
        removeBlog={mockRemoveBlog}
      />
    );
    const viewBtn = screen.getByRole('button', { name: 'view' });
    await user.click(viewBtn);
    const likeBtn = screen.getByRole('button', { name: 'like' });
    await user.click(likeBtn);
    await user.click(likeBtn);
    expect(mockUpdateLikes.mock.calls).toHaveLength(2);
  });
});
