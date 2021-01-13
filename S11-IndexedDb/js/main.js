$(document).ready(function () {
  //// Open Database
  var request = indexedDB.open("customermanager", 3);

  request.onupgradeneeded = function (e) {
    var db = e.target.result;

    if (!db.objectStoreNames.contains("customers")) {
      var os = db.createObjectStore("customers", {
        keyPath: "id",
        atoIncrement: true,
      });

      //// Create Index
      os.createIndex("name", "name", { unique: false });
    }
  };

  //// Success
  request.onsuccess = function (e) {
    console.log("Success: Opened Database...");
    db = e.target.result;

    //// Show Customers
    showCustomers();
  };

  //// Error
  request.onerror = function (e) {
    console.log("Error: Could Not Open Database...");
  };
});

//// Add Customer
function addCustomer() {
  var name = $("#name").val();
  var email = $("#email").val();

  var transaction = db.transaction(["customers"], "readwrite");

  //// Ask for ObjectStore
  var store = transaction.objectStore("customers");

  //// Define Customer
  var customer = {
    name: name,
    email: email,
  };

  //// Performe the Add
  var request = store.add(customer);

  //// Success
  request.onsuccess = function (e) {
    window.location.href = "index.html";
  };

  //// Error
  request.onerror = function (e) {
    alert("Sorry, the customer was not added");
    console.log("Error", e.target.error.name);
  };
}

//// Display Customers
function showCustomers(e) {
  var transaction = db.transaction(["customers"], "readonly");

  //// Ask for ObjectStore
  var store = transaction.objectStore("customers");
  var index = store.index("name");

  var output = "";
  index.openCursor().onsuccess = function (e) {
    var cursor = e.target.result;
    if (cursor) {
      output += "<tr>";
      output += "<td>" + cursor.value.id + "</td>";
      output += "<td><span>" + cursor.value.name + "</span></td>";
      output += "<td><span>" + cursor.value.email + "</span></td>";
      output += "<td><a href=''>Delete</a></td>";
      output += "</tr>";
      cursor.continue();
    }
    $("#customers").html(output);
  };
}
