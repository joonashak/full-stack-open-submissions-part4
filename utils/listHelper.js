const groupBy = require('lodash/groupBy');
const sortBy = require('lodash/sortBy');


const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    if (favorite.likes > blog.likes) return favorite;
    return blog;
  };

  return blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: null,
      blogs: 0,
    };
  }

  const grouped = groupBy(blogs, 'author');
  const sorted = sortBy(grouped, 'likes');
  const first = sorted.reverse()[0];

  return {
    author: first[0].author,
    blogs: first.length,
  };
};

const mostLikes = (blogs) => {
  const grouped = groupBy(blogs, 'author');

  const likesByAuthor = Object.keys(grouped).map((key) => {
    const blogsByAuthor = grouped[key];

    return {
      author: blogsByAuthor[0].author,
      likes: totalLikes(blogsByAuthor),
    };
  });

  const sortedLikes = sortBy(likesByAuthor, 'likes').reverse();

  return sortedLikes[0];
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
