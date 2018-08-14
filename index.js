const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todo-app';
const router = require('./routes');

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;

  dbo = db.db('todo-app');

  router(app, dbo);

  app.listen(7000, () => {console.log('Serve on port 7000')});
});
