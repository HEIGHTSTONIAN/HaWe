
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

  app.get("/", function(req, res) {

    if (req.user) {
      res.redirect("/app");
    }

    res.sendFile(path.join(__dirname, "../public/hawe.html"));
  });

  app.get("/login", function(req, res) {

    if (req.user) {
      res.redirect("/app");
    }

    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // blog route loads blog.html
  app.get("/app", isAuthenticated, function(req, res) {
    console.log("app");
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

};
