const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogs = require('./blogs');
const Blog = require('../models/blog');
const helper = require('./helper');

const initialBlogs = [blogs[0], blogs[1]];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  }, 15000);

  test('unique identifier is named id', async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('new blog post is added', async () => {
    await api
      .post('/api/blogs')
      .send(blogs[2])
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain(blogs[2].title);
  });

  test('missing likes property defaults to 0', async () => {
    const { title, author, url } = blogs[3];
    const missingLikesBlog = {
      title,
      author,
      url,
    };
    await api
      .post('/api/blogs')
      .send(missingLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    const addedBlog = blogsAtEnd.find(blog => blog.url === url);
    expect(addedBlog.likes).toBe(0);
  });

  test('if title or url missing fails with status code 400', async () => {
    const { author, likes } = blogs[4];
    const noTitleAndUrlBlog = {
      author,
      likes,
    };
    await api.post('/api/blogs').send(noTitleAndUrlBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('deletion of blog', () => {
  test('blog is deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const { id } = blogsAtStart[0];
    await api.delete(`/api/blogs/${id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map(r => r.title);
    expect(titles).not.toContain(blogsAtStart[0].title);
  });
});

describe('updating blog', () => {
  test('likes are updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const { id } = blogsAtStart[0];

    await api.put(`/api/blogs/${id}`).send({ likes: 150 });

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === id);
    expect(updatedBlog.likes).toBe(150);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
