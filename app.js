var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var courtsRouter = require('./routes/courts')
var reservationsRouter = require('./routes/reservations')
var authRouter = require('./routes/auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',courtsRouter, reservationsRouter, authRouter)

app.get('/',(req,res)=>{
  res.send('Bienvenue sur mon API RESTFULL de court de badminton')
})

module.exports = app;