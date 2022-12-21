import deepFreeze from 'deep-freeze';
import blogReducer from './blogReducer';

describe('blog reducer', () => {
  it('sets blogs array with blogs/setBlogs', () => {
    const initialState = [];
    const action = {
      type: 'blog/setBlogs',
      payload: [
        {
          title: 'test',
          author: 'tester',
          url: 'www',
          likes: 4,
        },
      ],
    };
    deepFreeze(initialState);
    const newState = blogReducer(initialState, action);
    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual({
      title: 'test',
      author: 'tester',
      url: 'www',
      likes: 4,
    });
  });
  it('adds blog with with blog/addBlog', () => {
    const initialState = [
      { title: 'first', author: 'tester', url: 'www', likes: 0 },
    ];
    const action = {
      type: 'blog/addBlog',
      payload: [
        {
          title: 'test',
          author: 'tester',
          url: 'www',
          likes: 4,
        },
      ],
    };
    deepFreeze(initialState);
    const newState = blogReducer(initialState, action);
    console.log(newState);
    expect(newState).toHaveLength(2);
  });
  it('increases likes by one with with blog/like', () => {
    const initialState = [
      { title: 'first', author: 'tester', url: 'www', likes: 4, id: 69 },
    ];
    const action = {
      type: 'blog/like',
      payload: 69,
    };
    deepFreeze(initialState);
    const newState = blogReducer(initialState, action);
    console.log(newState);
    expect(newState[0].likes).toBe(5);
  });
  it('deletes blog with with blog/delete', () => {
    const initialState = [
      { title: 'first', author: 'tester', url: 'www', likes: 4, id: 69 },
    ];
    const action = {
      type: 'blog/delete',
      payload: 69,
    };
    deepFreeze(initialState);
    const newState = blogReducer(initialState, action);
    console.log(newState);
    expect(newState).toHaveLength(0);
  });
});
