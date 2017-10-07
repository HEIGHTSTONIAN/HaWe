
var db = require("../models");
var express = require("express");
var router = express.Router();

module.exports = function (app) {

    //Getting User Sign Up info to Database
    app.post("/register", function(req, res) {

        console.log("signing up");

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.email;

        req.checkBody('username', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('passwordMatch', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if(errors){
            console.log(errors);
            res.render()
        } else {
            db.User.create({
                username: username,
                email: email,
                password: password
              }).then(function(dbUser) {
                console.log("did this2");
                res.json(dbUser);
              });

              res.redirect('/app');
            
        }

      });

};