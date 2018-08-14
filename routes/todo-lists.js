function todoListsOperations(app, db) {
  app.delete('/users/:userId/todo-list/:todoListId/remove', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;

    db.collection('todoLists').remove({ id: todoListId, user: userId }, (err, result) => {
      res.end('null');
    });
  });

  app.post('/users/:userId/todo-list/:todoListId/left', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;

    let order = +req.body[0].order;
    let orderSwap = +req.body[1].order;
    let todoListSwap = req.body[1];

    db.collection('todoLists').update(
    {
      id: todoListId,
      user: userId
    },
    { $set: { order: orderSwap } },
    (err, result) => {

      db.collection('todoLists').update(
        {
          id: +todoListSwap.id,
          user: userId
        },
        {
          $set: { order: order }
        },
        (err, result) => {res.end(JSON.stringify(req.body[0]))}
      );
    });
  });

  app.post('/users/:userId/todo-list/:todoListId/right', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;

    let order = +req.body[0].order;
    let orderSwap = +req.body[1].order;
    let todoListSwap = req.body[1];

    db.collection('todoLists').update(
    {
      id: todoListId,
      user: userId
    },
    { $set: { order: orderSwap } },
    (err, result) => {

      db.collection('todoLists').update(
        {
          id: +todoListSwap.id,
          user: userId
        },
        {
          $set: { order: order }
        },
        (err, result) => {res.end(JSON.stringify(req.body[0]))}
      );
    });
  });

}

module.exports = todoListsOperations;
