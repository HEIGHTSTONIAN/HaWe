
var path = require("path");
var express = require('express');
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

  app.get("/", function(req, res) {

    if (req.user) {
      res.render("app");
    }

    res.render("hawe");
  });

  app.get("/login", function(req, res) {

    if (req.user) {
      res.redirect("/app");
    }

    res.render("login");
  });
  app.get("/user", function(req, res) {
    res.redirect("/user");
  });

  // blog route loads blog.html
  app.get("/app", isAuthenticated, function(req, res) {
    console.log("app");
    res.render("app");
  });

};
