var db = require("../models");


//****Routes will need to be modified when user table is added******
//****Will also need to modify if making multiple lists*************
//*******************************************************************
module.exports = function(app) {

//GET route for getting all of the todos
 app.get("/app/todos/", function(req, res) {
   console.log("req.user: "+req.user);
   db.Todo.findAll({
    where: {
      UserId: req.user
    }
   }).then(function(results){
      res.json(results);
   });
 });

//GET route for user id
 app.get("/app.json", function(req, res) {
    console.log(req.user);
    console.log("req.todo "+req.body.text);
   db.User.findAll({
    where: {
      id: req.user
    }
   }).then(function(results){
      console.log(results[0].id);
      res.json(results[0].id);
   });
 }); 

// POST route for saving a new todo
  app.post("/app/todos/", function(req, res) {

    console.log("Line 34 in todo-routes");
    console.log(req.body);
    
    db.Todo.create({
    		text: req.body.text, 
        complete: req.body.complete,
        UserId: req.body.UserId 
    	}).then(function(dbTodo) {
      res.json(dbTodo)
    })
    .catch(function(err) {      
      res.json(err);
    });
    //res.redirect("/app");
  });

// PUT route for updating the status of todos
  app.put("/app/todos", function(req, res) {
    
    db.Todo.update({
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
     //res.redirect("/app")
  });


// DELETE route for deleting todos. 
  app.delete("/app/todos/", function(req, res) {
    console.log(req.body);
    db.Todo.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

}//end of module