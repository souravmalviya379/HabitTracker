const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Cannot start server');
    }else{
        console.log('Server running at port : '+port);
    }
});