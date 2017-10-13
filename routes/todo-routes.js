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

//GET route for getting the completionCount
 app.get("/app.json", function(req, res) {
    console.log("todo-routes.js line 27: "+req.user);

   db.User.findAll({
    where: {
      id: req.user
    }
   }).then(function(results){
      console.log("results[0].completionCount: "+results[0].completionCount);
      res.json(results[0].completionCount);
   });
 });


//GET route for getting all the todos that are marked complete
 app.get("/app/todos", function(req, res) {
    console.log("todo-routes.js line 42: "+req.user);

   db.Todo.findAll({
    where: {
      Userid: req.user,
      complete: true
    }
   }).then(function(results){
      console.log("results: "+results);
      res.json(results);
   });
 });


// POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    
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

// PUT route for updating the completion count
  app.put("/app.json", function(req, res) {
    console.log("req.body in app.put: "+req.body.completionCount);
    db.User.update({
      completionCount: req.body.completionCount
    }, {
      where: {
        id: req.user
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