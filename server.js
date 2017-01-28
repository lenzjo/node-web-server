const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

const port    = process.env.PORT || 3000;
var app = express();

hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});


// app.use((req, res, next) => {
//   res.render('maintanance.hbs', {
//       pageTitle: 'Maintanance Page',
//       msg: 'This site is undergoing some work, please try again later.'
//     });
// });


app.use(express.static( __dirname + '/public' ));




hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    msg: 'Welcome to my page!'
  });
});


// app.get('/', (req, res) => {
//   res.render('maintanance.hbs', {
//     pageTitle: 'Maintanance Page',
//     msg: 'This site is undergoing some work, please try again later.'
//   });
// });


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    status: 'error',
    msg: 'No such page.'
  })
});


app.listen(port, () => {
  console.log(`Server is up on Port ${port}`);
});
