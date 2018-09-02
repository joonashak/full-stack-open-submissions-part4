const listHelper = require('../utils/listHelper');

test('dummy is called', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
