//requiring express and database
const express = require('express');
const sequelize = require('./util/database');

//requiring routes
const feedRoutes = require('./routes/feed');

const app = express();

//middleware for parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//middleware for cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();  
})

//redirecting to routes
app.use('/', feedRoutes);

//middleware error handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data })
})

//starting server
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err)
  });
