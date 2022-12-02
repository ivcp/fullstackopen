require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.connect(MONGODB_URI).then(() => console.log('connected to DB'));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.tokenExtractor);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use(middleware.errorHandler);

module.exports = app;
