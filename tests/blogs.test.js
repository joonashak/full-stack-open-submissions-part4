const supertest = require('supertest');
const { app, server } = require('../index');
const { listWithManyBlogs, uniqueBlog } = require('./data');
const Blog = require('../models/blog');

const api = supertest(app);


beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listWithManyBlogs);
});

afterEach(async () => Blog.deleteOne({ _id: uniqueBlog._id }));


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


describe('POST /blogs', () => {
  const url = '/api/blogs';

  test('responds with JSON', async () => {
    await api
      .post(url)
      .send(uniqueBlog)
      .expect(201)
      .expect('Content-type', /application\/json/);
  });

  test('returns the inserted document', async () => {
    const result = await api
      .post(url)
      .send(uniqueBlog);

    expect(result.body).toEqual(uniqueBlog);
  });

  test('the inserted document is found in GET /blogs', async () => {
    await api
      .post(url)
      .send(uniqueBlog);

    const result = await api.get(url);
    expect(result.body).toContainEqual(uniqueBlog);
  });

  test('likes defaults to zero', async () => {
    const blog = uniqueBlog;
    delete blog.likes;

    const result = await api
      .post(url)
      .send(blog);

    expect(result.body.likes).toBe(0);
  });
});


afterAll(() => server.close());
