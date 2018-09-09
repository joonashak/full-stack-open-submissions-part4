const router = require('express').Router();
const jwt = require('express-jwt');
const Blog = require('../models/blog');
const User = require('../models/user');


router.get('/blogs', async (request, response) => {
  const result = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });

  response.json(result);
});

router.post('/blogs', jwt({ secret: 'dfjuhg78h4bhk5g0' }), async (request, response) => {
  const { user, body } = request;
  const {
    likes,
    author,
    title,
    url,
  } = body;


  // Linter complains, but this is the standard way to catch both null and undefined
  if (title == undefined && url == undefined) {
    return response.status(400).send();
  }

  const blog = new Blog({
    likes,
    author,
    title,
    url,
    user: user.id,
  });

  const result = await blog.save();

  const { blogs } = await User.findOne({ _id: user.id });
  blogs.push(result._id);

  await User.updateOne({ _id: user.id }, { blogs });

  return response.status(201).json(result);
});


router.delete('/blogs/:id', jwt({ secret: 'dfjuhg78h4bhk5g0' }), async (request, response) => {
  const _id = request.params.id;

  const { user } = await Blog.findOne({ _id });

  if (user && user.toString() !== request.user.id) {
    return response.status(400).send('You cannot delete this blog.');
  }

  await Blog.deleteOne({ _id });
  response.status(204).send();
});


router.put('/blogs/:id', async (request, response) => {
  const _id = request.params.id;
  await Blog.updateOne({ _id }, request.body);
  response.status(304).send();
});


module.exports = router;
