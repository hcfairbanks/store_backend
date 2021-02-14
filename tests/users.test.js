import "regenerator-runtime/runtime";
import createAdminUser from "./factories/adminUser";
import createUser from "./factories/user";
import db from "../models";
import faker from 'faker';
import i18n from '../helpers/setLanguage.js'
import server from "../app";
import truncate from "./truncate";
const Role = db.role;
const User = db.user;
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

describe("Test the users controller", () => {

  test("Create User", async () => {
    const customerRole = await Role
    .findOrCreate({where: {name: 'customer'}, defaults: {name: 'customer'}})
    const user = {
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
       "email": faker.internet.email(),
       "password": faker.internet.password(),
       "RoleId": customerRole[0].dataValues.id
    }
    const response = await request(server)
                            .post('/users')
                            .send(user)
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.statusCode).toBe(201);
    await User.destroy({ where: {id: response.body.id}, force: true })
    await Role.destroy({ where: {id: customerRole[0].dataValues.id}, force: true })
    server.close();
  });

  test("Update User", async () => {
    const user = await createUser('customer');
    const newFirstName = faker.name.firstName();
    const response = await request(server)
                            .patch(`/users/${user.id}`)
                            .send( { firstName: newFirstName } )
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);

    expect(response.body.data.firstName).toBe(newFirstName);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(i18n.__("users.update_success"));
    await User.destroy({ where: {id: user.id}, force: true })
    await Role.destroy({ where: {id: user.RoleId}, force: true })
    server.close();
  });

  test("Show User", async () => {
    const user = await createUser('customer');
    const response = await request(server)
                            .get(`/users/${user.id}`)
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.statusCode).toBe(200);
    await User.destroy({ where: {id: user.id}, force: true })
    await Role.destroy({ where: {id: user.RoleId}, force: true })
    server.close();
  });

  test("Delete User", async () => {
    const user = await createUser('customer');
    const totalUsers = await User.findAll()
    expect(totalUsers.length).toBe(2);
    const response = await request(server)
                            .delete(`/users/${user.id}`)
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toBe(i18n.__("users.delete_success"))
    await User.destroy({ where: {id: user.id}, force: true })
    await Role.destroy({ where: {id: user.RoleId}, force: true })
    server.close();
  });

  test("Index User", async () => {
    const user1 = await createUser('customer');
    const user2 = await createUser('customer');
    const user3 = await createUser('customer');

    const response = await request(server)
                            .get('/users')
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    expect(response.body.length).toBe(4);
    expect(response.statusCode).toBe(200);
    await User.destroy({ where: {id: [user1.id, user2.id, user3.id]}, force: true })
    await Role.destroy({ where: {id: user1.RoleId}, force: true })
    server.close();
  });

  test("Admin Update User", async () => {
    const adminRole = await Role.findOne({where: {name: 'admin'}})
    const user = await createUser('customer');
    const response = await request(server)
                            .patch(`/adminUserUpdate/${user.id}`)
                            .send( { RoleId: adminRole.id } )
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);

    expect(response.body.result.RoleId).toBe(adminRole.id);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(i18n.__("users.update_success"));
    await User.destroy({ where: {id: user.id}, force: true })
    await Role.destroy({ where: {id: user.RoleId}, force: true })
    server.close();
  });

  test("Admin Update User Password", async () => {
    const adminRole = await Role.findOne({where: {name: 'admin'}})
    const password = await faker.internet.password();
    const user = await createUser('customer');
    const response = await request(server)
                            .patch(`/usersUpdatePassword/${user.id}`)
                            .send({ password: password })
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);

    expect(response.body.data.email).toBe(user.email);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(i18n.__("users.update_success"));
    await User.destroy({ where: {id: user.id}, force: true })
    await Role.destroy({ where: {id: user.RoleId}, force: true })
    server.close();
  });

})