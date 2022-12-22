const listHelper = require('../utils/list_helper');
const blogs = require('./blogs');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(blogs[0].likes);
  });
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is {}', () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test('when list has only one blog, equals to that blog', () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual({
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    });
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});
