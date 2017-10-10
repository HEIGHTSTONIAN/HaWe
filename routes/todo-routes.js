var db = require("../models");


//****Routes will need to be modified when user table is added******
//*******************************************************************
module.exports = function(app) {

//GET route for getting all of the todos
 app.get("/app/todos/", function(req, res) {

   db.Todo.findAll({}).then(function(results){
      res.json(results);
      console.log("Results in app.get:")
      console.log(results);
   });
 });

 //Get route for getting all of the todos of a specific user
 //  app.get("/app/todos/:id", function(req, res) {
 //   var query = {};
 //   if (req.query.user_id) {
 //     query.UserId = req.query.user_id
 //   }
 //   db.Todo.findAll({
 //      where: query
 //   }).then(function(results){
 //      res.json(results);
 //   });
 // });


// POST route for saving a new todo
  app.post("/app/todos/", function(req, res) {

    console.log("req.body in app.post: ");
    console.log(req.body);
    
    db.Todo.create({
    		text: req.body.text, 
        complete: req.body.complete 
    	}).then(function(dbTodo) {
      res.json(dbTodo)
    })
    .catch(function(err) {      
      res.json(err);
    });
    //res.redirect("/app");
  });

// DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  // app.delete("/app/todos/:id", function(req, res) {
  //   // We just have to specify which todo we want to destroy with "where"
  //   db.Todo.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbTodo) {
  //     res.json(dbTodo);
  //   });

// });

// PUT route for updating todos. We can get the updated todo data from req.body
  // app.put("/app/todos/:id/:id", function(req, res) {

  //   // Update takes in an object describing the properties we want to update, and
  //   // we use where to describe which objects we want to update
  //   db.Todo.update({
  //     text: req.body.text,
  //     complete: req.body.complete
  //   }, {
  //     where: {
  //       id: req.body.id
  //     }
  //   }).then(function(dbTodo) {
  //     res.json(dbTodo);
  //   })
  //   .catch(function(err) {
  //     // Whenever a validation or flag fails, an error is thrown
  //     // We can "catch" the error to prevent it from being "thrown", which could crash our node app
  //     res.json(err);
  //   });
  // });
}