const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const port = 4400;

mongoose.connect('mongodb://localhost/slack-chatroom', { useNewUrlParser: true }, function (err, connection) {
  if (err) console.log(err, "err in mongoose")
  else console.log('Connected to mongodb');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '/')))
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'todos',
  cookie: {
    maxAge: 36000000
  },
  store: new MongoStore({ url: 'mongodb://localhost/slack-session' }),
  resave: true,
  saveUninitialized: true,

}))

app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware')
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

const users = {}
io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('chatting', (data) => {
    console.log(data)
    io.sockets.emit('chatting', data)
  })

  socket.on('online', (username) => {
    users[username] = socket.id;
    // io.emit('userList', users, users[users.length].id);
  })
  socket.on('sendMsg', (data) => {
    socket.emit('sendMsg', data)
  })

  socket.on('getMsg', (data) => {
    socket.broadcast.to(users[data.to]).emit('getMsg', {
      msg: data.msg,
      from: data.from,
      author: data.author
    });
  });
  socket.on('disconnect', () => {
    console.log(socket.id)
    delete users[Object.keys(users)[Object.values(users).indexOf(socket.id)]]
  })
});


require('./server/modules/passport')(passport)


app.use(require('./server/routes/routes'))

server.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
})