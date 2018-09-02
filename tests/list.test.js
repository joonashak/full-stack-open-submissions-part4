const listHelper = require('../utils/listHelper');
const data = require('./data');

const { listWithOneBlog, listWithManyBlogs, favoriteBlog } = data;


test('dummy is called', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total likes', () => {
  test('of empty list is zero.', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that.', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of many blogs is correct.', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe('Favorite blog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(undefined);
  });

  test('of one blogs is that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('of many blogs is correct.', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual(favoriteBlog);
  });
});
