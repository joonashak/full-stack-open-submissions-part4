const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const { mongoUrl, port } = require('./utils/config');


mongoose.connect(mongoUrl, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', blogsRouter);
app.use('/api', usersRouter);

const server = http.createServer(app);

// This prevents EADDRINUSE errors in testing by not hooking
// the app to a network port when in test mode.
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

server.on('close', () => mongoose.disconnect());


module.exports = {
  app,
  server,
};
