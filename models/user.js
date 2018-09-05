const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  name: String,
  adult: { type: Boolean, default: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

schema.statics.formatPublic = (user) => {
  const {
    id,
    username,
    name,
    adult,
    blogs,
  } = user;

  return {
    id,
    username,
    name,
    adult,
    blogs,
  };
};

const User = mongoose.model('User', schema);


module.exports = User;
