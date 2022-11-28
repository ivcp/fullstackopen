const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    response.status(400).end();
  }

  await blog.save();
  response.status(201).json(blog);
});

module.exports = blogsRouter;
