const format = (user) => {
  const { username, name, adult } = user;
  return { username, name, adult };
};


module.exports = {
  format,
};
