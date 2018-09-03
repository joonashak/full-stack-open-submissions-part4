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

describe('Most blogs', () => {
  test('in an empty list has count of zero and no author', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({
      author: null,
      blogs: 0,
    });
  });

  test('in a list of one blog are by that blog\'s author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('of many blogs is correct', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('Most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(undefined);
  });

  test('of one blogs is correct', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('of many blogs is correct', () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
