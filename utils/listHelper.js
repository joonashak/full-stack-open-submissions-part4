const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    if (favorite.likes > blog.likes) return favorite;
    return blog;
  };

  return blogs.reduce(reducer, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
