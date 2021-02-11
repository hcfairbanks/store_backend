import "regenerator-runtime/runtime";
import categoryFactory from "./factories/category"
import itemFactory from "./factories/item"
import createAdminUser from "./factories/adminUser";
import truncate from "./truncate";

//const app = require("../app");
import server from "../app";
import db from "../models";

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
  
  test("Homepage should respond with 200", async (done) => {
    const response = await request(server)
    .get("/")
    .set('myLanguage', 'en');
    expect(response.statusCode).toBe(200);
    expect(response.body.greeting).toBe('This is the Homepage in ENG')
    server.close();
    done();
  })

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

  test("Create Index", async () => {
    // TODO create some categories to see in the index
    const response = await request(server)
                            .get('/categories')
                            .set('myLanguage', 'en')
                            .set('bearer',jwt);

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(response.body);
    
    expect(response.statusCode).toBe(200);
    server.close();
  });




})