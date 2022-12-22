const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogs = require('./blogs');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./helper');
const bcrypt = require('bcrypt');

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
  let headers;
  beforeEach(async () => {
    const user = {
      username: 'tester',
      name: 'root',
      password: '12345',
    };
    await api.post('/api/users').send(user);
    const login = await api.post('/api/login').send(user);
    headers = {
      Authorization: `bearer ${login.body.token}`,
    };
  });

  test('new blog post is added', async () => {
    await api
      .post('/api/blogs')
      .send(blogs[2])
      .set(headers)
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
      .set(headers)
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
    await api
      .post('/api/blogs')
      .send(noTitleAndUrlBlog)
      .set(headers)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('blog fails if token not provided', async () => {
    const { title, author, url } = blogs[4];
    const missingLikesBlog = {
      title,
      author,
      url,
    };
    await api
      .post('/api/blogs')
      .send(missingLikesBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('deletion of blog', () => {
  let headers;
  beforeEach(async () => {
    const user = {
      username: 'tester',
      name: 'root',
      password: '12345',
    };
    await api.post('/api/users').send(user);
    const login = await api.post('/api/login').send(user);
    headers = {
      Authorization: `bearer ${login.body.token}`,
    };
  });
  test('blog is deleted', async () => {
    const blog = {
      title: 'test blog',
      author: 'tester',
      url: 'google.com',
      likes: 1,
    };
    await api.post('/api/blogs').send(blog).set(headers).expect(201);

    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs.find(b => b.title === blog.title);

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);

    const titles = blogsAtEnd.map(r => r.title);
    expect(titles).not.toContain(blog.title);
  });
});

describe('updating blog', () => {
  let headers;
  beforeEach(async () => {
    const user = {
      username: 'tester',
      name: 'root',
      password: '12345',
    };
    await api.post('/api/users').send(user);
    const login = await api.post('/api/login').send(user);
    headers = {
      Authorization: `bearer ${login.body.token}`,
    };
  });

  test('likes are updated', async () => {
    const blog = {
      title: 'update blog',
      author: 'tester',
      url: 'google.com',
      likes: 1,
    };
    await api.post('/api/blogs').send(blog).set(headers).expect(201);

    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs.find(b => b.title === blog.title);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 150 })
      .set(headers);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
    expect(updatedBlog.likes).toBe(150);
  });

  test('can add comments', async () => {
    const blog = {
      title: 'update blog',
      author: 'tester',
      url: 'google.com',
      likes: 0,
    };
    await api.post('/api/blogs').send(blog).set(headers).expect(201);
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs.find(b => b.title === blog.title);

    await api
      .post(`/api/blogs/${blogToUpdate.id}/comments`)
      .send({ comment: 'test comment' })
      .set(headers);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
    expect(updatedBlog).toHaveProperty('comments');
    expect(updatedBlog.comments).toContain('test comment');
  });
});
describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'qwert',
      name: 'tester',
      password: '12345',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  }, 10000);

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: '12345',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username or password are missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'tester',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username or password missing');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if password is < 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'tester',
      password: '12',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'password must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe('adding comments', () => {});

afterAll(() => {
  mongoose.connection.close();
});
