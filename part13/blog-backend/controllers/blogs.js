const router = require('express').Router();
const { Blog, User } = require('../models');
const { Op } = require('sequelize');
const tokenExtractor = require('../middleware/tokenExtractor');
const { sequelize } = require('../util/db');

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.title) {
    where.title = { [Op.iLike]: `%${req.query.title}%` };
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: sequelize.literal('likes DESC'),
  });
  return res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    return res.json(req.blog);
  } else {
    return res.status(404).end();
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const newBlog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(newBlog);
});

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (req.blog && user) {
    req.blog.userId === user.id
      ? await req.blog.destroy()
      : res.status(401).send({ error: 'Unauthorized' });
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
