const router = require('express').Router();
const { Blog } = require('../models');

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    return res.json(req.blog);
  } else {
    return res.status(404).end();
  }
});

router.post('/', async (req, res) => {
  const newBlog = await Blog.create(req.body);
  return res.json(newBlog);
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.body.likes) {
    return res.status(400).end();
  }

  if (req.blog) {
    await req.blog.update({ likes: req.body.likes });
    return res.status(200).send(`updated likes to ${req.body.likes}`);
  } else {
    return response.status(400).end();
  }
});

module.exports = router;
