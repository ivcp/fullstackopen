import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('Blog Form', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockCreateBlog = jest.fn();
    const user = userEvent.setup();
    render(<BlogForm createBlog={mockCreateBlog} />);

    const inputs = screen.getAllByRole('textbox');
    const submitBtn = screen.getByRole('button', { name: 'add blog' });
    await user.type(inputs[0], 'test title');
    await user.type(inputs[1], 'test author');
    await user.type(inputs[2], 'www.test.com');
    await user.click(submitBtn);

    expect(mockCreateBlog.mock.calls[0][0].title).toBe('test title');
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('test author');
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('www.test.com');
  });
});
