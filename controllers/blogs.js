const router = require('express').Router();
const Blog = require('../models/blog');


router.get('/blogs', async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
});

router.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = router;
