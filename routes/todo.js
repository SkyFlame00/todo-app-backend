function todoOperations(app, db) {

  // Change a todo list
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

  // Up a todo
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

  // Down a todo
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

  // Change todo's title
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
        $set: { 'todos.$.title': todo.title }
      },
      (err, result) => {res.end(JSON.stringify(todo))}
    )
  });

  // Remove a todo from the todo list
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

  // Add a todo to the todo list
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
        $addToSet: { todos: todo }
      },
      (err, result) => { res.end(JSON.stringify(todo)) }
    );
  });

  // Toggle todo's completion state
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
        $set: { 'todos.$.complete': todo.complete }
      },
      (err, result) => {res.end(JSON.stringify(todo))}
    )
  });

}

module.exports = todoOperations;
