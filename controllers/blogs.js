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

router.delete('/blogs/:id', async (request, response) => {
  await Blog.deleteOne({ _id: request.params.id });
  response.status(204).send();
});

router.put('/blogs/:id', async (request, response) => {
  const _id = request.params.id;
  await Blog.updateOne({ _id }, request.body);
  response.status(304).send();
});


module.exports = router;
