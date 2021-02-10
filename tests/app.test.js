import "regenerator-runtime/runtime";
import categoryFactory from "./factories/category"
import itemFactory from "./factories/item"
import createAdminUser from "./factories/adminUser";
import truncate from "./truncate";


const app = require("../app");
const request = require("supertest");
let jwt = "";

beforeAll( async () => {
  const adminUser = await createAdminUser();
  const response = await request(app)
    .post('/login')
    .send({ email: adminUser.email, password: 'pa55w0rd' })
    .set('myLanguage', 'en');
  jwt = response.body.jwt
})

afterAll( async () => {
  await truncate();
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
    
    // TODO 
    // Turn these into their own seperate tests
    const category1 = await categoryFactory();
    console.log("*********************");
    console.log(category1);

    const item = await itemFactory();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(item);

  });





});