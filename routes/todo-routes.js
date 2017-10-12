var db = require("../models");


//****Routes will need to be modified when user table is added******
//****Will also need to modify if making multiple lists*************
//*******************************************************************
module.exports = function(app) {

//GET route for getting all of the todos
 app.get("/api/todos/", function(req, res) {

   db.Todo.findAll({
     where: {
       UserId: req.user
     },
     order: [
       ['UserId', 'DESC'],
       ['complete', 'DESC']
     ]
   }).then(function(results){
      res.json(results);
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
  app.post("/api/todos", function(req, res) {

    console.log("req.body in app.post: ");
    console.log(req.body);
    console.log(req.user);
    
    db.Todo.create({
    		text: req.body.text, 
        complete: req.body.complete,
        UserId: req.user
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