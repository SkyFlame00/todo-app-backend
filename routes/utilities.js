function utilities(app, db) {

  app.get('/insert-mock-data', (req, res) => {
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

  app.get('/user/:userId/todo-lists/:todoListId', (req, res) => {
    let userId = req.params.userId;
    let todoListId = req.params.todoListId;

    db.collection('todoLists').find({
      id: +todoListId,
      user: +userId
    }).toArray((err, result) => {
      res.end(JSON.stringify(result))
    });
  });

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

}

module.exports = utilities;
