require('dotenv').config();
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

(async () => await Blog.sync())();

app.get('/api/blogs', async (_req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.json(blogs);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    return res.json(blog);
  } else {
    return res.status(404).end();
  }
});

app.post('/api/blogs/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    return res.json(newBlog);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const blogToDelete = await Blog.findByPk(req.params.id);
  try {
    await blogToDelete.destroy();
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
