const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'Unauthorized request' });
  }
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const id = request.params.id;
  const { likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  response.json(updatedBlog);
});

//ADDING COMMENTS

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id;
  const { comment } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id);
  updatedBlog.comments = [...updatedBlog.comments, comment];

  const savedBlog = await updatedBlog.save();

  response.status(200).json(savedBlog);
});

module.exports = blogsRouter;
