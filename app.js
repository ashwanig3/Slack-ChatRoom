const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')

const port = 4400;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/static', express.static(path.join(__dirname, '/')))

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');


if(process.env.NODE_ENV === 'development') {
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


app.use(require('./server/routes/routes'))

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
})