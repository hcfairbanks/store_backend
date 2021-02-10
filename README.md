# ES6ExpressTest
This is a demo application for showing how to set up express with ES6

################################################################################

TODO
- Translate all custom validation error messages from the sequilize ORM for 
  their respective models
- Roles might be better in a yaml file
- User update password
  * Allow admins to change any user passwords
  * Allow Users to change 'their' passwords
  * User update password needs to be hashed
  * require correct password when admin updates any password
  * require correct password when user updates their password
- More integration tests
  * https://www.youtube.com/watch?v=r8sPUw4uxAI
- Unit tests
- Linter needed
  * https://eslint.org/docs/user-guide/getting-started
- db more custom validations
- db delete children objects
- Better seeds with some kind of looping
- Create a setup guide
- Create a usefull instructions section
- Transaction locks
  + https://makandracards.com/makandra/31937-differences-between-transactions-and-locking
  + https://sequelize.org/master/class/lib/transaction.js~Transaction.html#static-get-LOCK
  + This is not very well documented or easy to find, but what you want is a  Transaction that wraps your find query which uses a lock option to turn it into a SELECT FOR UPDATE statement.

    The find query with the lock option will lock the row (you don't need to lock the entire table) and because you are using a transaction, the action will either be committed or rolled back depending on whether or not your instance holds the lock.

    You will want to adapt the code found in these examples for your use.
  + https://sequelize.org/master/manual/transactions.html


################################################################################
COMMANDS

# Starts with 
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
yarn seed

yarn dev

yarn run eslint ( yourfile.js or your_dir )

################################################################################
Sequelize DB create migrate seed

npx sequelize-cli model:generate --name Item --attributes name:string
npx sequelize-cli model:generate --name User --attributes firstName:string lastName:string email:string password:string

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string

npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
yarn seed
################################################################################

READ
--------------------------------------------------------------------------------
module exports vs exports

https://blog.tableflip.io/the-difference-between-module-exports-and-exports/#:~:text=module.exports%20wins&text=exports%20is%20assigned%20to%20is,Ruh%20roh!

https://www.sitepoint.com/understanding-module-exports-exports-node-js/
--------------------------------------------------------------------------------
https://golangbot.com/structs-instead-of-classes/
https://insights.untapt.com/webpack-import-require-and-you-3fd7f5ea93c0a
https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/
--------------------------------------------------------------------------------
Authentication
https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
--------------------------------------------------------------------------------
Something to look into with i18n on the db models
https://www.npmjs.com/package/sequelize-i18n
https://www.codota.com/code/javascript/functions/sequelize/Model/destroy
--------------------------------------------------------------------------------
custom error message for sequelize
https://stackoverflow.com/questions/43647482/custom-validation-error-using-sequelize-js
--------------------------------------------------------------------------------
Translations 
**** https://www.npmjs.com/package/i18n   these instructions worked ****
https://yarnpkg.com/package/i18n
https://phrase.com/blog/posts/node-js-i18n-guide/#Adding_an_I18n_provider
https://github.com/mashpie/i18n-node
--------------------------------------------------------------------------------
Seeds 
https://medium.com/@shannen.ye/setting-up-a-database-and-seed-file-7e73fe2a9fe6
--------------------------------------------------------------------------------
Sequelize
https://sequelize.org/master/manual/migrations.html

Squezeel Relations
https://sequelize.org/v3/docs/associations/

sequelize
https://www.codota.com/code/javascript/functions/sequelize/Model/update

sequelize validations and constraints
https://sequelize.org/master/manual/validations-and-constraints.html

ON DELETE CASCADE
https://stackoverflow.com/questions/23128816/sequelize-js-ondelete-cascade-is-not-deleting-records-sequelize/32271841
--------------------------------------------------------------------------------
JWT
https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/

JWT is a mix of these two tutorials
https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
--------------------------------------------------------------------------------

Authentication and Authorization
https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

Node.js - Role Based Authorization Tutorial with Example API
https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api

How To Manage User Roles In Node.js
https://www.youtube.com/watch?v=jI4K7L-LI58

NodeJS / Express Authorization Middleware
https://www.youtube.com/watch?v=zYi9PguVFx8

--------------------------------------------------------------------------------
Patch vs Put
https://rapidapi.com/blog/put-vs-patch/
--------------------------------------------------------------------------------
bcrypt
https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f

bcrypt docs
https://www.npmjs.com/package/bcrypt
--------------------------------------------------------------------------------
Postman, setting env varibales ( for JWT loging in)
https://blog.postman.com/extracting-data-from-responses-and-chaining-requests/
--------------------------------------------------------------------------------
Getting request url to check for domain or sub-domain
https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
--------------------------------------------------------------------------------




TESTS

// run tests with 
// yarn jest --forceExit
// or 
// yarn jest --runInBand
// yarn test1
// yarn test2


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



--------------------------------------------------------------------------------