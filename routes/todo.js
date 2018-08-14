function todoOperations(app, db) {
  app.post('/user/:userId/todo-list/:todoListId/todo/:todoId/change-title', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let todoId = +req.params.todoId;

    let todo = req.body;

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
      {
        $set: {
          'todos.$.title': todo.title
        }
      },
      (err, result) => {res.end(JSON.stringify(todo))}
    )
  });

  app.post('/user/:userId/todo-list/:todoListId/todo/:todoId/remove', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let todoId = +req.params.todoId;

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
      {
        $pull: {
          todos: {
            id: todoId
          }
        }
      },
      (err, result) => {res.end('null')}
    )
  });

  app.post('/user/:userId/todo-list/:todoListId/add-todo', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let todo = req.body;

    db.collection('todoLists').update(
      {
        id: todoListId,
        user: userId
      },
      {
        $addToSet: {
          todos: todo
        }
      },
      (err, result) => { res.end(JSON.stringify(todo)) }
    );

  });

  app.post('/user/:userId/todo-list/:todoListId/todo/:todoId/complete', (req, res) => {
    let userId = +req.params.userId;
    let todoListId = +req.params.todoListId;
    let todo = req.body;

    todo.complete = !todo.complete;

    db.collection('todoLists').update(
      {
        id: todoListId,
        user: userId,
        todos: {
          $elemMatch: {
            id: +todo.id
          }
        }
      },
      {
        $set: {
          'todos.$.complete': todo.complete
        }
      },
      (err, result) => {res.end(JSON.stringify(todo))}
    )
  });

}

module.exports = todoOperations;
