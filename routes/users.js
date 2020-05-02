var express = require('express');
var router = express.Router();

//require usermodel
var User = require('../models/user');


//Routes

//Create Users
router.post('/' , (req , res, next) => {
    //grab body data
    console.log(req.body);
    //save the data to database
    User.create(req.body, (err, data) => {
        if(err) return next(err); 
        //Calling next with a parameter takes directly to error handler middleware.
        console.log(req.body, data);
        
         //send a response to the client
        res.json({data});
    })
   
});

//List all users from the database

router.get('/', (req, res, next) =>{
    User.find({}, (err, users) => {
        if(err) return next(err);
        // res.json({users : users});
        res.render('users', {users});
    })
})

//Get a single user from database

router.get('/:userId', (req, res, next) => {
    var id = req.params.userId;
    User.findById(id, (err, user) => {
        if (err) return next(err);
        res.json({user : user});
    })


});

//Update a single user

router.put("/:id", (req, res, next) => {
    
    var id = req.params.id;
    
    User.findByIdAndUpdate(id, req.body, {new : true}, (err, updatedUser) => {
       
        if(err) return next(err);
        
        res.json({updatedUser});
    });

});

// //Delete a user

router.delete(":id", (req, res, next) => {
    var id = req.params.id;
    
    User.findByIdAndDelete(id, (err, user) =>{
        if(err) return next(err);
        
        res.json({user});
    });
});

module.exports = router;

