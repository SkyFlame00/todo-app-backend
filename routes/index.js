const applySettings = require('./apply-settings.js');
const utilities = require('./utilities.js');
const todoListsOperations = require('./todo-lists.js');
const todoOperations = require('./todo.js');

function router(app, db) {

  applySettings(app, db);
  utilities(app, db); // Some actions were necessary during development
  todoListsOperations(app, db);
  todoOperations(app, db);

}

module.exports = router;
