# Todo app back end

Back end was made with NodeJS and MongoDB.

## Launch

```
npm i
node index
```

## Database

[MongoDB should be installed](https://docs.mongodb.com/manual/installation/) on your computer

## Production

Although both sample server and angular app are not actually working in production mode, code that can implement serving angular app may look as follows (which is indeed working on sample server at [http://185.174.173.130:5000/](http://185.174.173.130:5000/)):

```javascript
let express = require('express');
let app = express();

app.use(express.static('angular'));

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

app.listen(5000, (req, res) => { console.log('Server is run on port 5000'); });
```

where `express.static('angular')` specifies the folder in which compiled angular app is placed. `index.html` is, therefore, angular app's bootstrap file.

## Used NodeJS modules

* express
* mongodb
* body-parser

For serving both front end and back end was user `pm2` module as well.
