
var path = require("path");


module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/hawe.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/hawe", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/hawe.html"));
  });

  // blog route loads blog.html
  app.get("/app", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

};
