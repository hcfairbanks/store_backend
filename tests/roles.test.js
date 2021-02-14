import regeneratorRuntime from 'regenerator-runtime';
import request from 'supertest';
import roleFactory from './factories/role';
import createAdminUser from './factories/adminUser';
import db from '../models';
import i18n from '../helpers/setLanguage';
import server from '../app';
import truncate from './truncate';

const Role = db.role;
let jwt;

beforeAll(async () => {
  await truncate();
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

describe('Test the root path', () => {
  test('Create Role', async () => {
    const role = { name: 'clerk' };
    const response = await request(server)
      .post('/roles')
      .send(role)
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.name).toBe(role.name);
    expect(response.statusCode).toBe(201);
    await Role.destroy({ where: { id: response.body.id }, force: true });
    server.close();
  });

  test('Update Role', async () => {
    const role = await roleFactory('clerk');
    const newName = 'customer';
    const response = await request(server)
      .patch(`/roles/${role.id}`)
      .send({ name: newName })
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.name).toBe(newName);
    expect(response.statusCode).toBe(200);
    await Role.destroy({ where: { id: role.id }, force: true });
    server.close();
  });

  test('Show Role', async () => {
    const role = await roleFactory('clerk');
    const response = await request(server)
      .get(`/roles/${role.id}`)
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.name).toBe(role.name);
    expect(response.statusCode).toBe(200);
    await Role.destroy({ where: { id: role.id }, force: true });
    server.close();
  });

  test('Delete Role', async () => {
    const role = await roleFactory('customer');
    const totalRoles = await Role.findAll();
    expect(totalRoles.length).toBe(2);
    const response = await request(server)
      .delete(`/roles/${role.id}`)
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toBe(i18n.__('roles.delete_success'));
    server.close();
  });

  test('Index Roles', async () => {
    const roles = [{ name: 'clerk' }, { name: 'customer' }];
    await Role.bulkCreate(roles);
    const response = await request(server)
      .get('/roles')
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.length).toBe(3);
    expect(response.statusCode).toBe(200);
    await Role.destroy({ where: { name: ['clerk', 'customer'] }, force: true });
    server.close();
  });
});
