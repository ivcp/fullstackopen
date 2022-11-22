require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(entries => response.json(entries))
    .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(phonebook => {
      const time = new Date();
      const html = `
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${time.toString()}</p>
  `;
      response.send(html);
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(entry => {
      response.json(entry);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findOneAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: `${!body.name ? 'name' : 'number'} missing`,
    });
  }
  const newEntry = new Person({
    name: body.name,
    number: body.number,
  });
  newEntry
    .save()
    .then(entry => response.json(entry))
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const entry = {
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, entry, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(updatedEntry => {
      response.json(updatedEntry);
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
