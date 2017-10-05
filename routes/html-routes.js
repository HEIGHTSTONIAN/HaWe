
var path = require("path");


module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ztd.html"));
  });

  app.get("/app", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

  // blog route loads blog.html
  app.get("/ztd", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ztd.html"));
  });

};
