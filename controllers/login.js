const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');


router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const pwdIsCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && pwdIsCorrect)) {
    return response
      .status(401)
      .send('Invalid username or password');
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id,
  }, process.env.SECRET);

  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
    });
});


module.exports = router;
