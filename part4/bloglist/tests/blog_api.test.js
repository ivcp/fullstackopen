const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogs = require('./blogs');
const Blog = require('../models/blog');

const initialBlogs = [blogs[0], blogs[1]];

beforeEach(async () => {
  await Blog.deleteMany({});
  const noteObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArr = noteObjects.map(blog => blog.save());
  await Promise.all(promiseArr);
});

const api = supertest(app);
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
}, 10000);

test('unique identifier is named id', async () => {
  const id = blogs[0]._id;
  const response = await api.get(`/api/blogs/${id}`);
  expect(response.body.id).toBeDefined();
});

test('new blog post is added', async () => {
  await api
    .post('/api/blogs')
    .send(blogs[2])
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length + 1);

  const titles = response.body.map(blog => blog.title);
  expect(titles).toContain(blogs[2].title);
});

test('missing like property defaults to 0', async () => {
  const { _id, title, author, url } = blogs[3];
  const missingLikesBlog = {
    _id,
    title,
    author,
    url,
  };
  const newBlog = await api.post('/api/blogs').send(missingLikesBlog);
  expect(newBlog.body.likes).toBe(0);
});

test('if title or url missing response is 400', async () => {
  const { author, likes } = blogs[4];
  const noTitleAndUrlBlog = {
    author,
    likes,
  };
  await api.post('/api/blogs').send(noTitleAndUrlBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
