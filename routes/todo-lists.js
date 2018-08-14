function todoListsOperations(app, db) {

  // Add a todo list
  app.post('/user/:userId/add-list', (req, res) =>{
    let userId = +req.params.userId;
    let data = req.body;

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
        res.end(JSON.stringify(todoList));
      });
    });

  });

  // Get todo lists
  app.get('/user/:userId/todo-lists', (req, res) => {
    let userId = +req.params.userId;

    db.collection('todoLists').find({ user: userId }).toArray((err, result) => {
      res.end(JSON.stringify(result));
    });
  });

  // Remove a todo list from user's dashboard
  app.delete('/users/:userId/todo-list/:todoListId/remove', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;

    db.collection('todoLists').remove({ id: todoListId, user: userId }, (err, result) => {
      res.end('null');
    });
  });

  // Move a todo list left
  app.post('/users/:userId/todo-list/:todoListId/left', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let order = +req.body[0].order;
    let orderSwap = +req.body[1].order;
    let todoListSwap = req.body[1];

    db.collection('todoLists').update(
    { id: todoListId, user: userId },
    { $set: { order: orderSwap } },
    (err, result) => {

      db.collection('todoLists').update(
        { id: +todoListSwap.id, user: userId },
        { $set: { order: order } },
        (err, result) => {res.end(JSON.stringify(req.body[0]))}
      );

    });
  });

  // Move a todo list right
  app.post('/users/:userId/todo-list/:todoListId/right', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let order = +req.body[0].order;
    let orderSwap = +req.body[1].order;
    let todoListSwap = req.body[1];

    db.collection('todoLists').update(
    { id: todoListId, user: userId },
    { $set: { order: orderSwap } },
    (err, result) => {

      db.collection('todoLists').update(
        { id: +todoListSwap.id, user: userId },
        { $set: { order: order } },
        (err, result) => {res.end(JSON.stringify(req.body[0]))}
      );

    });
  });

}

module.exports = todoListsOperations;
