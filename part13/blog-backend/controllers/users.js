const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  return res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

router.put('/:username', async (req, res) => {
  if (!req.body.username) {
    return res.status(400).end();
  }
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    await user.update({ username: req.body.username });
    return res.status(200).send(`Username updated to ${req.body.username}`);
  } else {
    return response.status(400).end();
  }
});

module.exports = router;
