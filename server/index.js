//requiring express and database
const express = require('express');
const sequelize = require('./util/database');
const path = require('path');

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

//deployment
app.use(express.static(path.join(__dirname, 'dist/client')));


//redirecting to routes
app.use('/', feedRoutes);


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/index.html'));
});


//middleware error handler
app.use((error, req, res, next) => {
  console.log('dd..........................................');
  console.log(error.message);
  console.log(error.data);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data[0].msg })
})

//starting server
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    const port = process.env.PORT || '8080';
    app.listen(port);
  })
  .catch(err => {
    console.log(err)
  });
