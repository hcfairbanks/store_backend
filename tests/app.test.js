// Integration tests
// Unit tests needed

// https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
// https://www.npmjs.com/package/supertest
// https://jestjs.io/docs/en/getting-started.html



/// ????
// https://medium.com/@pojotorshemi/integration-test-on-express-restful-apis-using-jest-and-supertest-4cf5d1414ab0

// READ this
// https://www.softwaretestinghelp.com/the-difference-between-unit-integration-and-functional-testing/
// https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
const request = require("supertest");
const app = require("../app");


// run tests with 
// yarn jest --forceExit
// or 
// yarn jest --runInBand

let jwt = "";

beforeAll( async () => {
  // Proof of concept
  // the notional JWT value is being set here
  // it's being used in the get test
  jwt = await request(app)
                .get("/")
                .set('myLanguage', 'en');
  process.env.NODE_ENV = 'test';
})



describe("Test the root path", () => {
  const somethingElse = request(app)
  .get("/")
  .set('myLanguage', 'en');

  test("It should response the GET method", async () => {
    // For format of the requests being sent 
    // look at the supertest docs here
    // https://www.npmjs.com/package/supertest

    const response = await request(app)
                            .get("/")
                            .set('myLanguage', 'en');
    //await console.log(response.body)
    console.log(jwt.body)
    expect(response.statusCode).toBe(200);
  });
});