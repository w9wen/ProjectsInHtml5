var db = null;

if (window.openDatabase) {
  db = openDatabase("NoteTest", "1.0", "Stickys Database", 10000000);
  if (!db) {
    alert("Failed to open database");
  }
} else {
  alert(
    "Failed to open database, make sure your browser supports HTML5 web storage.  "
  );
}

function Note() {
  var self = this;
  var note = document.createElement("div");
  note.className = "note";

  note.addEventListener(
    "mousedown",
    function (e) {
      return self.onMouseDown(e);
    },
    false
  );

  note.addEventListener(
    "click",
    function () {
      return self.onNoteClick();
    },
    false
  );

  this.note = note;

  var close = document.createElement("div");
  close.className = "closebutton";

  close.addEventListener(
    "click",
    function (e) {
      return self.close(e);
    },
    false
  );

  note.appendChild(close);

  var edit = createElement("div");
  edit.className = "edit";
  edit.setAttribute("contenteditable", false);
}
