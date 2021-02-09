// run tests with 
// yarn jest --forceExit
// or 
// yarn jest --runInBand

// TODO
// Setting up sequelize db for testing. Creates a user factory.
// https://medium.com/riipen-engineering/testing-with-sequelize-cc51dafdfcf4

// https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// https://www.npmjs.com/package/supertest
// https://jestjs.io/docs/en/getting-started.html
// https://medium.com/@pojotorshemi/integration-test-on-express-restful-apis-using-jest-and-supertest-4cf5d1414ab0
// https://www.softwaretestinghelp.com/the-difference-between-unit-integration-and-functional-testing/
// https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
// https://jestjs.io/docs/en/expect#expectarraycontainingarray
// https://www.npmjs.com/package/supertest

// For format of the requests being sent 
// look at the supertest docs here
// https://www.npmjs.com/package/supertest


import "regenerator-runtime/runtime";
const request = require("supertest");
const app = require("../app");

import db from "../models";

const Role = db.role;
const User = db.user;
const saltRounds = 10;
var bcrypt = require('bcrypt');

let jwt = "";

beforeAll( async () => {

  process.env.NODE_ENV = 'test';
  const adminRole = await Role.create({"name": "admin"})
  const adminSalt = await bcrypt.genSaltSync(saltRounds)
  const password  = await bcrypt.hashSync("pa55w0rd", adminSalt);
  const adminUser = await User.create({
    "firstName": "admin",
    "lastName": "admin",
    "email": "admin@test.com",
    "password": password,
    "RoleId": adminRole.id
  });

  const response = await request(app)
  .post('/login')
  .send({ email: 'admin@test.com', password: 'pa55w0rd' })
  .set('myLanguage', 'en');

  jwt = response.body.jwt

})

afterAll( async () => {
  await User.destroy({ where: { email: 'admin@test.com' }})
  await Role.destroy({ where: { name: 'admin' }})
})


describe("Test Users Login", () => {

  test("Homepage should respond with 200", async () => {
    const response = await request(app)
    .get("/")
    .set('myLanguage', 'en');
    expect(response.statusCode).toBe(200);
    expect(response.body.greeting).toBe('This is the Homepage in ENG')
  })

  test("Login should work", async () => {
    const response = await request(app)
                            .post('/login')
                            .send({
                                    email: 'admin@test.com',
                                    password: 'pa55w0rd'
                                  })
                            .set('myLanguage', 'en');
    expect(response.body.message).toBe('Access Granted');
    expect(response.statusCode).toBe(200);
    jwt = response.body.jwt
  });

  test("users Index", async () => {
    const response = await request(app)
                            .get('/users')
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);
    //  expect.arrayContaining('123')
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

});