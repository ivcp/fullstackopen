require('dotenv').config();
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize');

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

const main = async () => {
  try {
    const blogs = await Blog.findAll();
    blogs.forEach(blog =>
      console.log(
        `${blog.dataValues.author}: ${blog.dataValues.title} ${blog.dataValues.likes} likes`
      )
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
