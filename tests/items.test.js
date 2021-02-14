import regeneratorRuntime from 'regenerator-runtime';
import faker from 'faker';
import request from 'supertest';
import categoryFactory from './factories/category';
import createAdminUser from './factories/adminUser';
import db from '../models';
import i18n from '../helpers/setLanguage';
import itemFactory from './factories/item';
import server from '../app';
import truncate from './truncate';

const Item = db.item;
const Category = db.category;
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

describe('Test the root path', () => {
  test('Create Item', async () => {
    const category = await categoryFactory();
    const item = {
      name: faker.name.firstName(),
      description: 'somethings',
      quantity: '50',
      price: '50',
      CategoryId: category.id,
    };
    const response = await request(server)
      .post('/items')
      .send(item)
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.name).toBe(item.name);
    expect(response.statusCode).toBe(201);
    await Item.destroy({ where: {}, force: true });
    await Category.destroy({ where: {}, force: true });
    server.close();
  });

  test('Update Item', async () => {
    const item = await itemFactory();
    const newName = faker.name.firstName();
    const response = await request(server)
      .patch(`/items/${item.id}`)
      .send({ name: newName })
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.result.name).toBe(newName);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(i18n.__('items.update_success'));
    await Item.destroy({ where: {}, force: true });
    await Category.destroy({ where: {}, force: true });
    server.close();
  });

  test('Show Item', async () => {
    const item = await itemFactory();
    const response = await request(server)
      .get(`/items/${item.id}`)
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.name).toBe(item.name);
    expect(response.statusCode).toBe(200);
    await Item.destroy({ where: {}, force: true });
    await Category.destroy({ where: {}, force: true });
    server.close();
  });

  test('Delete Item', async () => {
    const item = await itemFactory();
    const totalItems = await Item.findAll();
    expect(totalItems.length).toBe(1);
    const response = await request(server)
      .delete(`/items/${item.id}`)
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toBe(i18n.__('items.delete_success'));
    await Item.destroy({ where: {}, force: true });
    await Category.destroy({ where: {}, force: true });
    server.close();
  });

  test('Index Item', async () => {
    await itemFactory();
    await itemFactory();
    await itemFactory();

    const response = await request(server)
      .get('/items')
      .set('myLanguage', 'en')
      .set('bearer', jwt);
    expect(response.body.length).toBe(3);
    expect(response.statusCode).toBe(200);
    await Item.destroy({ where: {}, force: true });
    await Category.destroy({ where: {}, force: true });
    server.close();
  });
});
