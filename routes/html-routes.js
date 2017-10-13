
var path = require("path");
var express = require('express');
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

  // Home Page
  app.get("/", function(req, res) {

    if (req.user) {
      res.render("app");
    }

    res.render("hawe");
  });

  // Log In Page
  app.get("/login", function(req, res) {

    if (req.user) {
      res.redirect("/app");
    }

    res.render("login");
  });

  // Badge Page
  app.get("/user", function(req, res) {
    if (req.user) {
      res.render("user");
    }

    //res.redirect("/login");
  

  });

  // App Page
  app.get("/api/app", isAuthenticated, function(req, res) {

    if (req.user) {
      res.render("app");
    }
  });

  app.get("/app", function(req, res) {
    if (req.user) {
      res.render("app");
    }
  

  });

};
