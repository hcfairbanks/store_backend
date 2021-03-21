TODO
- Translate all custom validation error messages from the sequilize ORM for 
  their respective models
- Roles switch to yaml file
- More integration tests
  * https://www.youtube.com/watch?v=r8sPUw4uxAI
- Unit tests
- Linter needed
  * https://eslint.org/docs/user-guide/getting-started
- db more custom validations
- db delete children objects
- Better seeds with loop
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

npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
yarn seed
yarn dev
################################################################################
yarn run eslint
yarn test1
yarn test2
################################################################################
