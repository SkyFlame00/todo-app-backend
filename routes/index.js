const bodyParser = require('body-parser');

const todoOperations = require('./todo.js');
const todoListsOperations = require('./todo-lists.js');

function router(app, db) {
  app.use(bodyParser.json());

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

  app.get('/insert-mock-data', (req, res) => {
console.log('here');
    let mockData = require('../mock-data.js');

    db.collection('todoLists').insert(mockData.todoLists, (err, result) => {
      res.end('Data has been inserted!')
    });
  });

  app.get('/show-db', (req, res) => {
    db.collection('todoLists').find({}).toArray((err, result) => {
      res.end(`
        <!doctype html>
        <html>

        <head>
          <title>Input</title>
          <script>
          console.log(${JSON.stringify(result)});
          </script>
        </head>

        <body>
          ${JSON.stringify(result)}<br />

        </body>

        </html>
      `);
    });
  });

  app.get('/drop-db', (req, res) => {
    db.dropDatabase();
    res.end('The database has been dropped successfully');
  });

  app.get('/', (req, res) => {
    res.end(`
      <body>
      <form action="/" method="post">
        <input type="text" name="txt">
        <input type="submit" value="OK">
      </form>
      </body>
    `);
  });

  app.post('/', (req, res) => {


    res.end(`
      <body>
      ${JSON.stringify(req.body)}

      <form action="/" method="post">
        <input type="text" name="txt">
        <input type="submit" value="OK">
      </form>
      </body>
    `);
  });

  app.get('/user/:userId/todo-lists/:todoListId', (req, res) => {
    let userId = req.params.userId;
    let todoListId = req.params.todoListId;
    console.log(userId, todoListId);

    db.collection('todoLists').find({
      id: +todoListId,
      user: +userId
    }).toArray((err, result) => {
      console.log(result);
      res.end(JSON.stringify(result))
    });
  });

  app.get('/user/:userId/todo-lists', (req, res) => {
    let userId = +req.params.userId;

    db.collection('todoLists').find({ user: userId }).toArray((err, result) => {
      res.end(JSON.stringify(result));
    });
  });

  app.post('/user/:userId/add-list', (req, res) =>{
    let userId = +req.params.userId;
    let data = req.body;
    console.log(data);

    let todoList = {
      id: null,
      title: data.title,
      order: data.order,
      user: data.user,
      todos: data.todos
    };

    db.collection('todoLists').find({}).sort({id: -1}).limit(1).toArray((err, result) => {
      let max = result[0].id;
      todoList.id = max + 1;

      db.collection('todoLists').insertOne(todoList, (err, response) => {
        console.log(todoList);
        res.end(JSON.stringify(todoList));
      });

    });


  });

  app.post('/users/:userId/todo-list/:todoListId', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let title = req.body.title;
    let data = req.body;

    let todoList = {
      id: data.id,
      title: data.title,
      order: data.order,
      user: data.user,
      todos: data.todos
    };

    db.collection('todoLists').update(
      { id: todoListId, user: userId },
      { $set: { title: title } },
      (err, result) => { res.end(JSON.stringify(todoList)); }
    )
  });

  app.post('/users/:userId/todo-list/:todoListId/todo/:todoId/up', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let todoId = +req.params.todoId;

    let order = +req.body[0].order;
    let orderSwap = +req.body[1].order;
    let todoSwap = req.body[1];

    db.collection('todoLists').update(
    {
      id: todoListId,
      user: userId,
      todos: {
        $elemMatch: {
          id: todoId
        }
      }
    },
    { $set: { 'todos.$.order': orderSwap } },
    (err, result) => {

      db.collection('todoLists').update(
        {
          id: todoListId,
          user: userId,
          todos: {
            $elemMatch: {
              id: +todoSwap.id
            }
          }
        },
        {
          $set: { 'todos.$.order': order }
        },
        (err, result) => {res.end('end')}
      );
    });
  });

  app.post('/users/:userId/todo-list/:todoListId/todo/:todoId/down', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let todoId = +req.params.todoId;

    let order = +req.body[0].order;
    let orderSwap = +req.body[1].order;
    let todoSwap = req.body[1];

    db.collection('todoLists').update(
    {
      id: todoListId,
      user: userId,
      todos: {
        $elemMatch: {
          id: todoId
        }
      }
    },
    { $set: { 'todos.$.order': orderSwap } },
    (err, result) => {

      db.collection('todoLists').update(
        {
          id: todoListId,
          user: userId,
          todos: {
            $elemMatch: {
              id: +todoSwap.id
            }
          }
        },
        {
          $set: { 'todos.$.order': order }
        },
        (err, result) => {res.end('end')}
      );
    });
  });

  app.get('/test', (req, res) => {
    db.collection('todoLists').find({id: 1, user: 1}, {'todos.id': 1}).toArray((err, result) => {
      res.end(`
        <head>
          <script>
            console.log(${JSON.stringify(result)})
          </script>
        </head>
      `)
    });
  });

  todoOperations(app, db);

  todoListsOperations(app, db);

  app.get('/db', (req, res) => {
    db.collection('todoLists').find({}).toArray((err, resp) => {
      res.end(`
        <head>
          <script>
            console.log(${JSON.stringify(resp)})
          </script>
        </head>
      `);
    });
  });

  app.get('/max', (req, res) => {
    db.collection('todoLists').findOne({id: 1, user: 1}, (err, result) => {

      let todos = result.todos;

      let max = 0;

      todos.forEach(item => { max = item.id > max ? item.id : max });

      console.log(todos);
      console.log(max);

      res.end('')
    });
  });

}

module.exports = router;
