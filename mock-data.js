module.exports = {
    users: [

    ],
    todoLists: [
      {
        id: 1,
        title: 'Todo List #1',
        order: 1,
        user: 1,
        todos: [
          {
            id: 1,
            title: 'Todo #1',
            order: 1,
            todoList: 1,
            complete: false
          },
          {
            id: 2,
            title: 'Todo #2',
            order: 2,
            todoList: 1,
            complete: false
          },
          {
            id: 3,
            title: 'Todo #3',
            order: 3,
            todoList: 1,
            complete: false
          }
        ]
      },
      {
        id: 2,
        title: 'Todo List #2',
        order: 2,
        user: 2,
        todos: [
          {
            id: 1,
            title: 'Todo #1',
            order: 1,
            todoList: 2,
            complete: false
          },
          {
            id: 2,
            title: 'Todo #2',
            order: 2,
            todoList: 2,
            complete: false
          },
          {
            id: 3,
            title: 'Todo #3',
            order: 3,
            todoList: 2,
            complete: false
          }
        ]
      },
      {
        id: 3,
        title: 'Todo List #3',
        order: 2,
        user: 1,
        todos: [
          {
            id: 1,
            title: 'Todo #1',
            order: 1,
            todoList: 3,
            complete: false
          },
          {
            id: 2,
            title: 'Todo #2',
            order: 2,
            todoList: 3,
            complete: false
          },
          {
            id: 3,
            title: 'Todo #3',
            order: 3,
            todoList: 3,
            complete: false
          }
        ]
      }
    ]
};
