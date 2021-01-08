//// Set todo list variable
var todoList = JSON.parse(localStorage.getItem("todos"));

$(document).ready(function () {
  //// Set counter
  var i = 0;

  //// Check for todos
  if (todoList != null) {
    //// Loop through and output li items
    $.each(todoList, function (key, value) {
      $("#todos").prepend(
        '<li id="task-' +
          i +
          '"><a id="todo_link" href="#edit" data-todo_name ="' +
          value.todo_name +
          '" data-todo_date="' +
          value.todo_date +
          '">' +
          value.todo_name +
          " <span>" +
          value.todo_date +
          "</span></a></li>"
      );

      i++;
    });
    //// Refresh
    $("#todos").listview("refresh");
  }

  //// Add Todo
  $("#add_form").submit(function (params) {
    //// Get submitted values
    var todo_name = $("#todo_name").val();
    var todo_date = $("#todo_date").val();

    //// Simple field validation
    if (todo_name == "") {
      alert("Please give the todo a name");
    } else if (todo_date == "") {
      alert("Please add a date");
    } else {
      var todos = JSON.parse(localStorage.getItem("todos"));
      ////  Check todos
      if (todos == null) {
        todos = [];
      }

      //// Create array with new todo
      var new_todo = {
        todo_name: todo_name,
        todo_date: todo_date,
      };

      todos.push(new_todo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  //// Clear Todos
  $("#clear_button").click(function () {
    localStorage.clear();
  });
});
