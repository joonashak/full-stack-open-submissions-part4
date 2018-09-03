const supertest = require('supertest');
const { app, server } = require('../index');
const { listWithManyBlogs, uniqueBlog } = require('./data');
const Blog = require('../models/blog');

const api = supertest(app);
const url = '/api/blogs';


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listWithManyBlogs);
});


describe('GET /blogs', () => {
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

  test('status 400 if no title and url present', async () => {
    const blog = uniqueBlog;
    delete blog.title;
    delete blog.url;

    await api
      .post(url)
      .send(blog)
      .expect(400);
  });
});


describe('DELETE /blogs/:id', () => {
  test('correct blog is deleted', async () => {
    const id = listWithManyBlogs[3]._id;
    await api.delete(`${url}/${id}`);

    const result = await api.get(url);
    const ids = result.body.map(blog => blog._id);
    expect(ids).not.toContain(id);
  });
});


describe('PUT /blogs/:id', () => {
  test('all fields are updated correctly on an existing blog', async () => {
    const id = listWithManyBlogs[2]._id;

    const updatedBlog = {
      title: 'An updated title',
      author: 'This has changed too',
      url: 'http://helsinki.fi/',
      likes: 9999,
      __v: 0,
    };

    await api
      .put(`${url}/${id}`)
      .send(updatedBlog);

    const result = await api.get(url);
    updatedBlog._id = id;
    expect(result.body).toContainEqual(updatedBlog);
  });
});


afterAll(() => server.close());
