const router = require('express').Router();
const { Blog } = require('../models');
const { sequelize } = require('../util/db');

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('blog.id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    order: sequelize.literal('likes DESC'),
  });
  return res.json(blogs);
});

module.exports = router;
