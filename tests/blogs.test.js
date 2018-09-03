const supertest = require('supertest');
const { app, server } = require('../index');
const { listWithManyBlogs } = require('./data');
const Blog = require('../models/blog');

const api = supertest(app);


beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listWithManyBlogs);
});


describe('GET /blogs', () => {
  const url = '/api/blogs';

  test('responds with JSON', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  test('returns correct number of documents', async () => {
    const result = await api.get(url);
    expect(result.body.length).toEqual(listWithManyBlogs.length);
  });

  test('result includes a blog from the database', async () => {
    const result = await api.get(url);
    expect(result.body).toContainEqual(listWithManyBlogs[1]);
  });
});


afterAll(() => server.close());
