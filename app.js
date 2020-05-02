//Requires


var port = process.env.port || 4000;
var hostname = 'localhost';
var express = require('express');
var mongoose = require('mongoose');


//Require router files
var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');


//Connect to database

mongoose.connect('mongodb://localhost:27017/mongoose-crud',{useUnifiedTopology : true}, (err) => {
    console.log("connected", err ? err : true);
});



//Instantiate Express App

var app = express();


//Middlewares required

app.use(express.json());

// app.use()

// Setup View Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');




//Routing middlewares

app.use('/', indexRouter);

app.use('/users', usersRouter);



//Error handler middlewares

app.use((err, req, res, next ) => {
    if(err ==='ValidationError'){
        res.statusCode = 400;
        res.json({error : err.message});
    }

    res.statusCode = 500;
});

//404 error

app.use((req, res ,next) => {
    res.statusCode = 404;
    res.send('<h1>Error 404 Page Not Found</h1>');
});
//

//Listener

app.listen(port, hostname, () => {
    console.log('Server started on port ' + port);
});



// //Routing Conventions

// //Create a resource

// GET -> "/articles/new" , "/articles/create"
// POST -> "/articles/"

// //List

// GET -> "/articles"
// GET -> "/articles/:id"

// //Update

// GET -> "/articles/:id/edit"
// PUT -> "/articles/:id"

// //Delete

// DELETE -> "/articles/:id"
// GET -> "/articles/:id/delete"

// POST -> "articles/:id/comments"