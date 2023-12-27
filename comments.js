// Create web server
// 1. create web server
// 2. listen to port 3000
// 3. create a route for GET /comments
// 4. create a route for POST /comments
// 5. create a route for GET /comments/:id
// 6. create a route for PUT /comments/:id
// 7. create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const comments = require('./data/comments');
const vehicles = require('./data/vehicles');
const contacts = require('./data/contacts');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('dev'));

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  if (newComment) {
    newComment._id = comments.length + 1;
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ msg: `invalid request body` });
  }
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment._id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ msg: `comment with id ${id} does not exist` });
  }
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment._id === id);
  if (comment) {
    const updatedComment = req.body;
    if (updatedComment) {
      Object.assign(comment, updatedComment);
      res.status(200).json(comment);
    } else {
      res.status(400).json({ msg: `invalid request body` });
    }
  } else {
    res.status(404).json({ msg: `comment with id ${id} does not exist` });
  }
});

// DELETE