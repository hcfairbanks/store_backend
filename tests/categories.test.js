import "regenerator-runtime/runtime";
import categoryFactory from "./factories/category"
// import itemFactory from "./factories/item"
import createAdminUser from "./factories/adminUser";
import db from "../models";
import faker from 'faker';
import server from "../app";
import truncate from "./truncate";
import { i18n } from '../helpers/setLanguage.js'
const Category = db.category;
const request = require("supertest");
let jwt = "";

beforeAll( async () => {
  const adminUser = await createAdminUser();
  const response = await request(server)
    .post('/login')
    .send({ email: adminUser.email, password: 'pa55w0rd' })
    .set('myLanguage', 'en');
  jwt = response.body.jwt
  server.close();
})

afterAll( async () => {
  await truncate();
  server.close();
})

describe("Test the root path", () => {

  test("Create Category", async () => {
    const response = await request(server)
                            .post('/categories')
                            .send({
                                    name: 'Winter Jackets'
                                  })
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.name).toBe('Winter Jackets');
    expect(response.statusCode).toBe(201);
    await Category.destroy({ where: {}, force: true })
    server.close();
  });

  test("Update Category", async () => {
    const category = await categoryFactory();
    const newName = faker.commerce.productName();
    const response = await request(server)
                            .patch(`/categories/${category.id}`)
                            .send({
                                    name: newName
                                  })
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.name).toBe(newName);
    expect(response.statusCode).toBe(200);
    await Category.destroy({ where: {}, force: true })
    server.close();
  });

  test("Show Category", async () => {
    const category = await categoryFactory();
    const response = await request(server)
                            .get(`/categories/${category.id}`)
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.name).toBe(category.name);
    expect(response.statusCode).toBe(200);
    await Category.destroy({ where: {}, force: true })
    server.close();
  });

  test("Delete Category", async () => {
    const category = await categoryFactory();
    const totalCategories = await Category.findAll()
    expect(totalCategories.length).toBe(1);
    const response = await request(server)
                            .delete(`/categories/${category.id}`)
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toBe(i18n.__("categories.delete_success"))
    await Category.destroy({ where: {}, force: true })
    server.close();
  });

  test("Index Category", async () => {
    const categories = [
      { name: faker.commerce.productName() },
      { name: faker.commerce.productName() },
      { name: faker.commerce.productName() }
    ]

    await Category.bulkCreate(categories)
    const response = await request(server)
                            .get('/categories')
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.length).toBe(3);
    expect(response.statusCode).toBe(200);
    await Category.destroy({ where: {}, force: true })
    server.close();
  });

})