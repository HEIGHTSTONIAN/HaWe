$(document).ready(function() {
// Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("#taskName");
  var $actionTaskAdd = $("#action-task-add");
  // Our new todos will go inside the todoContainer
  var $todoContainer = $(".todo-container");

  $(document).on("submit", "#newTask", insertTodo);

  // Our initial todos array
  var todos = [];

  // Getting todos from database when page loads
  getTodos();

  // This function resets the todos displayed with new todos from the database
  // function initializeRows() {
  //   console.log("In initializeRows");
  //   $todoContainer.empty();
  //   var rowsToAdd = [];
  //   for (var i = 0; i < todos.length; i++) {
  //     rowsToAdd.push(createNewRow(todos[i]));
  //   }
  //   $todoContainer.prepend(rowsToAdd);
  // }

  // This function grabs todos from the database and updates the view
  function getTodos() {
    console.log("In getTodos");
    $.get("/app/todos", function(data) {
      console.log("Data in getTodos: "+data);
      todos = data;
      console.log("Todos in getTodos: "+todos);
      //initializeRows();
    });
    window.location.href = "/app"
  }

  // This function updates a todo in our database
  function updateTodo(todo) {
    $.ajax({
      method: "PUT",
      url: "/app/todos/",
      data: todo
    }).done(getTodos);
  }

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    //event.preventDefault();
    console.log("Inside of insertTodo");
    console.log("Event: "+event);
    console.log("$newItemInput: "+$newItemInput);
    var newItem = event;
    var todo = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    console.log("todo: "+todo);
    $.post("/app/todos", todo, getTodos);
    //window.location.href = "/app"
    $newItemInput.val("");
  }





















})//end of document ready