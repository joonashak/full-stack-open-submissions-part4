const router = require('express').Router();
const Blog = require('../models/blog');


router.get('/blogs', async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
});

router.post('/blogs', async (request, response) => {
  const data = request.body;

  // Linter complains, but this is the standard way to catch both null and undefined
  if (data.title == undefined && data.url == undefined) {
    return response.status(400).send();
  }

  const blog = new Blog(request.body);

  const result = await blog.save();
  return response.status(201).json(result);
});

module.exports = router;
