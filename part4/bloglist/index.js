const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl =
  'mongodb+srv://fullstack:favocado1988@cluster0.b8maf2h.mongodb.net/bloglist?retryWrites=true&w=majority';
mongoose.connect(mongoUrl).then(() => console.log('connected to DB'));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
