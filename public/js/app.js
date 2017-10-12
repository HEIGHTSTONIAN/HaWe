//***The code as is will get all task.****  
//When users table is read we can link them up 
//so only the logged in users task will show
$(document).ready(function() {


//Grab html elements in jqeury
var $newItemInput = $("#taskName");
var $actionTaskAdd = $("#action-task-add");

// Our new todos will go inside the todoContainer
var $todoContainer = $("#tasks-list");
//Array of new Inputs
//var $newInputRow = [];
//todos array that is used for holding todos to push into the html
var todos = [];
var user = 0;



//Buttons
$(document).on("submit", "#newTask", insertTodo);
$(document).on("submit", "#tasklist", toggleDone);
$(document).on("click", "#delete-button", deleteTodo);


getTodos();// this happens on page load to get the tasks and start working on them


// Displays Todos
  function getTodos() {

    console.log("In getTodos");
    $.get("/api/todos", function(data) {

      console.log(data);

      $todoContainer.empty();

      for (var i = 0; i < data.length; i++) {

        var row = "<li><div id='" + data[i].id + "' class='status'>To Do</div><input id='" + data[i].id + "' class='check-status' type='checkbox' value='" + data[i].id + "' /><span>" + data[i].text + "</span></li>";
        
        $todoContainer.prepend(row);

        console.log("ID: " + data[i].id);

        if (data[i].complete === true) {
          $("div#" + data[i].id).html("Done");
          $("div#" + data[i].id).toggleClass("done");

          $("input[type=checkbox][id=" + data[i].id + "]").prop({disabled : true});
        }

      }
      
  });
 }//end of getTodos
 
//Gets the user Id out of the db
  function getUser() {
    console.log("In getUser");
    $.get("/app.json", function(data) {
      user = data;
      console.log(user);
      return user;
  });
 } 

// This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    console.log("Inside of insertTodo");
    var UserId= "req.user";
    
    //var newItem = event;
    var todo = {
      text: $newItemInput.val().trim(),
      complete: false,
      UserId: UserId
   };
    
   console.log(todo);

    $.post("/api/todos", {
      text: todo.text,
      complete: todo.complete,
      UserId: todo.UserId
    }).then(function(data) {
      console.log(data);
      $newItemInput.val("");
      getTodos();
    }).catch(function(err) {
      console.log(err);
    });
  }//end of insert

// This function updates a todo in our database
  function updateTodo(todo) {
    console.log("Update todo ran");
    $.ajax({
      method: "PUT",
      url: "/app/todos/",
      data: todo   //todo is an object
    }).done(getTodos);
  }//end of updateTodo  


//*************toggleDone and toggleTodo can probably be combined**********
  function toggleDone() {
    event.preventDefault();
    event.stopPropagation();
    console.log("Inside toggleDone");
    
    $("input[type=checkbox]:checked").each(function(){
      //toggleArr.push($(this).val());
    
      var todo = {
        id: parseInt($(this).val()),
        complete: true
      }
      console.log(todo);
      updateTodo(todo);
    });
  }//end of toggledone

  //Deletes a task
  function deleteTodo() {
    console.log("deleteTodo is running.")
    $("input:checkbox:checked").each(function(){      
      var todo = {
        id: parseInt($(this).val()),
      }
        console.log(todo);
    
        $.ajax({
          method: "DELETE",
          url: "/app/todos/",
          data: todo
        }).done(getTodos);    
    });

  }

});

