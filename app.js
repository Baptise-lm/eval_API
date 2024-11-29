var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var terrainsRouter = require('./routes/terrains')
var reservationsRouter = require('./routes/reservations')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',terrainsRouter, reservationsRouter)

app.get('/badminton',(req,res)=>{
  res.send('badminton')
})

module.exports = app;