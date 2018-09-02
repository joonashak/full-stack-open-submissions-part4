const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');


const mongoUrl = 'mongodb://localhost/bloglist';
mongoose.connect(mongoUrl);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
