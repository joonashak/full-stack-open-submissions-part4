const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  name: String,
  adult: { type: Boolean, default: true },
});

schema.statics.formatPublic = (user) => {
  const {
    id,
    username,
    name,
    adult,
  } = user;

  return {
    id,
    username,
    name,
    adult,
  };
};

const User = mongoose.model('User', schema);


module.exports = User;
