import regeneratorRuntime from 'regenerator-runtime';
import request from 'supertest';
import createAdminUser from './factories/adminUser';
import truncate from './truncate';
import server from '../app';

let jwt;

beforeAll(async () => {
  const adminUser = await createAdminUser();
  const response = await request(server)
    .post('/login')
    .send({ email: adminUser.email, password: 'pa55w0rd' })
    .set('myLanguage', 'en');
  jwt = response.body.jwt;
  server.close();
});

afterAll(async () => {
  await truncate();
  server.close();
});

describe('Test publicliy available api', () => {
  test('Homepage should respond with 200', async () => {
    const response = await request(server)
      .get('/')
      .set('myLanguage', 'en');
    expect(response.statusCode).toBe(200);
    expect(response.body.greeting).toBe('This is the Homepage in ENG');
    server.close();
  });

  test('Login should work', async () => {
    const response = await request(server)
      .post('/login')
      .send({
        email: 'admin@test.com',
        password: 'pa55w0rd',
      })
      .set('myLanguage', 'en');
    expect(response.body.message).toBe('Access Granted');
    expect(response.statusCode).toBe(200);
    jwt = response.body.jwt;
    server.close();
  });
});
