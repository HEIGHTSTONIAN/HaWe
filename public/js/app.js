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


//Buttons
$(document).on("submit", "#newTask", insertTodo);
$(document).on("submit", "#tasklist", toggleDone);
$(document).on("click", "#to-do-button", toggleTodo);
$(document).on("click", "#delete-button", deleteTodo);



getTodos();// this happens on page load to get the tasks and start working on them


//This will empty out the row of task and remake it with a new task added. 
  function initializeRows() {
    console.log("Inside of initializeRows");
    $todoContainer.empty();
    var rowsToAdd = [];
    //console.log(todos);
    for (var i = 0; i < todos.length; i++) {
      rowsToAdd.push(createNewRow(todos[i]));
      //console.log(rowsToAdd);
    }
    $todoContainer.prepend(rowsToAdd);
  }

//this will get the todos out of the db
  function getTodos() {
    console.log("In getTodos");
    $.get("/app/todos", function(data) {

      todos = data;

      initializeRows();  //this will start the process of making rows
  });
 }//end of getTodos

// This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    console.log("Inside of insertTodo");
    
    //var newItem = event;
    var todo = {
      text: $newItemInput.val().trim(),
      complete: false
   };
    
    $.post("/app/todos", todo, getTodos);
    //window.location.href = "/app"
    $newItemInput.val("");

  }//end of insert


// This function creates the html for a todo task. 
  function createNewRow(todo) {
    console.log("Inside of createNewRow")
     var $newInputRow = $(
      [
		"<li>",
			"<div class='status'>To Do</div>",
			"<input class='check-status' type='checkbox' name='id' value='",
			todo.id,  //this is how I am grabbing the checkboxes  "value=id"
			"' />",
			"<span>", 
			todo.text, 
			"</span>",
		"</li>"
      ].join("")
    );

  //Storing data in the $newInputRow and in html elements
  $newInputRow.find("button.delete").data("id", todo.id);
  $newInputRow.data("todo", todo);
  console.log(todo);
  console.log($newInputRow.data());


//Marks the task as Done if the todo.complete is true
    if (todo.complete) {
      $newInputRow.find("div.status").html("Done");
      $newInputRow.find("div.status").toggleClass("done");
    }else{
      $newInputRow.find("div.status done").html("To Do");
      $newInputRow.find("div.status").toggleClass("done");      
    }
    
    return $newInputRow;
  }//end of createNewRow

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
    var toggleArr = [];
    $("input:checkbox[name=id]:checked").each(function(){
      //toggleArr.push($(this).val());
      
      var todo = {
        id: parseInt($(this).val()),
        complete: true
      }
      console.log(todo);
      updateTodo(todo);
    });
  }//end of toggledone
  
  function toggleTodo() {
    event.preventDefault();
    event.stopPropagation();
    console.log("Inside toggleTodo");
    var toggleArr = [];
    

    $("input:checkbox[name=id]:checked").each(function(){      
      var todo = {
        id: parseInt($(this).val()),
        complete: false
      }
      console.log(todo);
      updateTodo(todo);
    });
   }//end of toggle todo


//Deletes a task
  function deleteTodo() {
    console.log("deleteTodo is running.")
    $("input:checkbox[name=id]:checked").each(function(){      
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

