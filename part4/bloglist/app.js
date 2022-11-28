require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

mongoose.connect(MONGODB_URI).then(() => console.log('connected to DB'));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/blogs', blogsRouter);

module.exports = app;
