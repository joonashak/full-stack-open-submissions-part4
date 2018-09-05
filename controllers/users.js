const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.get('/users', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { _id: 1, likes: 1, author: 1, title: 1, url: 1 });

  response.json(users.map(User.formatPublic));
});

router.post('/users', async (request, response) => {
  const {
    username,
    password,
    name,
    adult,
  } = request.body;

  // Data validation
  if (password && password.length < 3) {
    return response
      .status(400)
      .send('Password must be at least 3 characters.');
  }

  // Create new User
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
    name,
    adult,
  });

  // Insert into DB
  try {
    const newUser = await user.save();
    response.status(201).json(User.formatPublic(newUser));
  } catch (ex) {
    if (ex.code === 11000) {
      response
        .status(400)
        .send('Username already exists.');
    } else {
      response.status(500).send();
    }
  }
});

module.exports = router;
