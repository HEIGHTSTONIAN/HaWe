
var db = require("../models");
var express = require("express");

module.exports = function (app) {

    //Getting User Sign Up info to Database
    app.post("/login", function(req, res) {

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.email;

        db.User.create({
            username: username,
            email: email,
            password: password
          }).then(function(dbUser) {
            console.log("did this2");
            res.json(dbUser);
          });

      });

};