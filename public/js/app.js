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
var completionCount = 0;
var runningCount = 0;


//Buttons
$(document).on("submit", "#newTask", insertTodo);
$(document).on("submit", "#tasklist", toggleDone);
$(document).on("click", "#delete-button", deleteTodo);


//getTodos();// this happens on page load to get the tasks and start working on them
getUserCount()

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
          console.log(data[i].complete);
          //completionCount++;
          console.log(completionCount);
          $("div#" + data[i].id).html("Done");
          $("div#" + data[i].id).toggleClass("done");

          $("input[type=checkbox][id=" + data[i].id + "]").prop("checked", true);
          $("input[type=checkbox][id=" + data[i].id + "]").prop({disabled : true});
          
        }

      }

     });
 }//end of getTodos

//Gets the completion count in User table
  function getUserCount() {
    console.log("In getUser");
      
    $.get("/app.json", function(data) {
      completionCount = data;
      console.log("This is # of completed tasks in user.js: "+data);
      console.log("Running Count: "+completionCount);

  }).done(getTodos);

}; 

//Getting the number of tasks marked as complete in Todo table
 //  function getTodoComp() {
 //    console.log("In getTodoComp");
 //    $.get("/app/todos", function(data) {
 //      count = data.length;
 //    if(count>0){
 //      runningCount += count;
 //      console.log(count);
 //      console.log("This is the stuff in getTodoComp: "+runningCount);
 //      }else{
 //      console.log("This is the stuff in getTodoComp: "+runningCount); 
 //    }    
 //  }).done(updateCount);
 // } 

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
      getUserCount();
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
    }).done(getUserCount);
  }//end of updateTodo  

//This function updates the count in user table
  function updateCount() {
    console.log("Update Count ran: "+completionCount);

    var counts = {
      completionCount: completionCount
    }
    $.ajax({
      method: "PUT",
      url: "/app.json/",
      data: counts   
    });
  
 }

//Marks the task as complete
  function toggleDone() {
    event.preventDefault();
    event.stopPropagation();
    console.log("Inside toggleDone");

//need to add a check to see if it has been counted already       
$("input[type=checkbox]:checked").each(function(){      
      
    if($("input[type=checkbox]:checked").hasClass("counted")){
        console.log("Already counted");
    }else{  

      $("input[type=checkbox]:checked").addClass("counted")
      completionCount++;
      var todo = {
        id: parseInt($(this).val()),
        complete: true
      }

      var count = {
        completionCount: completionCount
      }
      console.log(todo);
      updateTodo(todo);
      console.log("Count 162: "+count);
      updateCount(count);
    }//end of else
  });
    
}  

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
        }).done(getUserCount);    
     });
  }

});





