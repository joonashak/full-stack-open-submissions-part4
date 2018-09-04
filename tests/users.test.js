const supertest = require('supertest');
const { app, server } = require('../index');
const { uniqueUser, userList } = require('./users.data');
const { format } = require('./utils');
const User = require('../models/user');

const api = supertest(app);
const url = '/api/users';

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(userList);
});


describe('GET /users', () => {
  test('responds with JSON', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  test('returns correct documents', async () => {
    const result = await api.get(url);
    expect(result.body.map(format)).toEqual(userList.map(format));
  });
});

describe('POST /users', () => {
  test('valid user is created', async () => {
    const result = await api
      .post(url)
      .send(uniqueUser);

    expect(format(result.body)).toEqual(format(uniqueUser));
  });

  test('duplicate user is not allowed', async () => {
    await api
      .post(url)
      .send(uniqueUser);

    await api
      .post(url)
      .send(uniqueUser)
      .expect(400);

    const result = await api.get(url);
    expect(result.body.length).toEqual(userList.length + 1);
  });

  test('long password is enforced', async () => {
    const { username, name, adult } = uniqueUser;

    const invalidUser = {
      username,
      name,
      adult,
      password: 'as',
    };

    await api
      .post(url)
      .send(invalidUser)
      .expect(400);

    const result = await api.get(url);
    expect(result.body.length).toEqual(userList.length);
  });

  test('adult defaults to true', async () => {
    const { username, password, name } = uniqueUser;
    const newUser = { username, password, name };

    const result = await api
      .post(url)
      .send(newUser);

    expect(result.body.adult).toBe(true);
  });
});


afterAll(() => server.close());
