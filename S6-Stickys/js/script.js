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
  edit.addEventListener(
    "keyup",
    function () {
      return self.OnKeyUp();
    },
    false
  );

  note.appendChild(edit);
  this.editField = edit;

  var ts = document.createElement("div");
  ts.className = "timestamp";
  ts.addEventListener(
    "mousedown",
    function (e) {
      return self.onMouseDown(e);
    },
    false
  );
  note.appendChild(ts);
  this.lastModified = ts;

  document.body.appendChild(note);

  return this;
}

Note.prototype = {
  get id() {
    if (!("_id" in this)) {
      this._id = 0;
    }
    return this._id;
  },

  set id(x) {
    this._id = x;
  },

  get text() {
    return this.editField.innerHTML;
  },

  set text(x) {
    this.editField.innerHTML = x;
  },

  get timestamp() {
    if (!("_timestamp" in this)) {
      this._timestamp = 0;
    }
    return this._timestamp;
  },

  set timestamp(x) {
    if (this._timestamp === x) {
      return;
    }
    this._timestamp = x;
    var date = new Date();
    date.setTime(parseFloat(x));
    this.lastModified.textContent = modifiedString(date);
  },

  get left() {
    return this.note.style.left;
  },

  set left(x) {
    this.note.style.left = x;
  },

  get top() {
    return this.note.style.top;
  },

  get top(x) {
    this.note.style.top = x;
  },

  get zIndex() {
    return this.note.style.zIndex;
  },

  get zIndex(x) {
    this.note.style.zIndex = x;
  },

  close: function (e) {
    this.cancelPendingSave();
    var note = this;
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM MyStickys WHERE id =?', [note.id]);
    });
    document.body.removeChild(this.note);
  },

  saveSoon: function () {
    this.cancelPendingSave();
    var self = this;
    this._saveTimer = setTimeout(() => {
      self.save()
    }, 200);
  },

  cancelPendingSave: function () {
    if (!("_saveTimer" in this)) {
      return;
    }
    clearTimeout(this._saveTimer);
    delete this._saveTimer;
  },

  save: function () {
    this.cancelPendingSave();
    if ("dirty" in this) {
      this.timestamp = new Date().getTime();
      delete this.dirty;
    }
    var note this;
    db.transaction(function (tx) {
      tx.executeSql("UPDATE MyStickys SET note = ?, timestamp = ?, left =?, top = ?, zindex = ? WHERE id = ?",
      [note.text, note.timestamp, note.left, note.top, note.zIndex, note.id]);
    })
  },

  saveAsNoew = function () {
    this.timestamp = new Date.getTime();
    var note = this;
    db.transaction(function (tx) {
      tx.executeSql("INSERT INTO MyStickys (id, note, timestamp, left, top, zindex)");
    });
  }

};
