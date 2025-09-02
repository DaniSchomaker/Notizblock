let notesTitles = [];
let notes = [];

let trashNotesTitles = [];
let trashNotes = [];

let archiveNotesTitles = [];
let archiveNotes = [];

// ich muss definieren, wo/wann sie angezeigt werden
//  // HTML: <div> mit id erstellen
//  // JS: "render"-function, die beschreibt, wie etwas auf dem Bildschirm dargestellt wird
//  // HTML: function ausführen lassen <body onload="functionname()">
// JS: Das "HTML" in eine extra function (Template) schreiben

/////////////////////////// Bereiche rendern ///////////////////////////

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = ""; // zu Beginn leeren

  let titleRef = document.getElementById("title_input"); //???
  titleRef.innerHTML = ""; //???

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote); // Das HTML wird aus der function renderNotes() ausgegliedert
    titleRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function getNoteTemplate(indexNote) { // get = kriegen wir // Übergabeparameter (indexNote)
  return `<p>+ Titel: ${notesTitles[indexNote]} - Notiz: ${notes[indexNote]}
  <button onclick="noteToArchive(${indexNote})">Archiv</button>
  <button onclick="noteToTrash(${indexNote})">Papierkorb</button>
  </p>`;
}

// Archiv anlegen
function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archive_content");
  archiveContentRef.innerHTML = "";

  for (
    let indexArchiveNote = 0;
    indexArchiveNote < archiveNotes.length;
    indexArchiveNote++
  ) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
  }
}

function getArchiveNoteTemplate(indexArchiveNote) {
  return `<p>+ Titel: ${archiveNotesTitles[indexArchiveNote]} - Notiz: ${archiveNotes[indexArchiveNote]}
  <button onclick="archiveToNotes(${indexArchiveNote})">Notizen</button>
  <button onclick="archiveToTrash(${indexArchiveNote})">Papierkorb</button></p>`;
} 

// Papierkorb anlegen
function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++ ////
  ) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote); ////
  }
}

// Das HTML wird aus der function renderTrashNotes() ausgegliedert
function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ Titel: ${trashNotesTitles[indexTrashNote]} - Notiz: ${trashNotes[indexTrashNote]}
  <button onclick="trashToNotes(${indexTrashNote})">wiederherstellen</button>
  <button onclick="trashToArchive(${indexTrashNote})">in das Archiv verschieben</button>
  <button onclick="deleteNote(${indexTrashNote})">endgültig löschen</button>
  </p>`;
}

/////////////////////////// Funktionalitäten: Input-Feld / Buttons ///////////////////////////

// Hole Daten aus dem Input-Feld --> Notizen

function addNote() {
  let noteInputRef = document.getElementById("note_input"); // Eingabe auslesen
  let noteInput = noteInputRef.value;

  let titleInputRef = document.getElementById("title_input");
  let titleInput = titleInputRef.value;
  // man kann das oben auch in einer Zeile machen, aber TIPP: Referenzen zu den HTML-Elementen und dass, was ich damit mache trennen

  notes.push(noteInput); // Eingabe dem notes-Array hinzufügen
  notesTitles.push(titleInput); // Eingabe aus dem Title-Array hinzufügen

  renderNotes(); // Eingabe anzeigen lassen
  renderArchiveNotes();
  renderTrashNotes();

  noteInputRef.value = ""; //am Ende das Eingabefeld leeren
  titleInputRef.value = "";

  saveToLocalStorage(); // Wenn eine Notiz hinzugefügt wurde, wird diese im LocalStorage gespeichert
}

// Verschiebe Notizen --> Archiv

function noteToArchive(indexNote) {
  let archiveNote = notes.splice(indexNote, 1);
  archiveNotes.push(archiveNote[0]);

  let archiveNoteTitle = notesTitles.splice(indexNote, 1);
  archiveNotesTitles.push(archiveNoteTitle[0]);

  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();

  saveToLocalStorage();
}

// Verschiebe Notizen --> Papierkorb

function noteToTrash(indexNote) {
  let trashNote = notes.splice(indexNote, 1); // EINZELNE (!) trashNote ungleich trashNotes!
  trashNotes.push(trashNote[0]);
  let trashNoteTitle = notesTitles.splice(indexNote, 1);
  trashNotesTitles.push(trashNoteTitle[0]);
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();

  saveToLocalStorage(); // Wenn eine Notiz in den Papierkorb geschoben wird, wird diese im LocalStorage gespeichert
}

// Verschiebe Notiz aus Archiv --> Notizen ("wiederherstellen")

function archiveToNotes(indexArchiveNote) {
  let movedNote = archiveNotes.splice(indexArchiveNote, 1)[0];
  let movedNoteTitle = archiveNotesTitles.splice(indexArchiveNote, 1)[0];

  notes.push(movedNote);
  notesTitles.push(movedNoteTitle);

  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
  saveToLocalStorage();
}

// Verschiebe Notiz aus Archiv --> Papierkorb

function archiveToTrash(indexArchiveNote) {
  let movedNote = archiveNotes.splice(indexArchiveNote, 1)[0];
  let movedNoteTitle = archiveNotesTitles.splice(indexArchiveNote, 1)[0];

  trashNotes.push(movedNote);
  trashNotesTitles.push(movedNoteTitle);

  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
  saveToLocalStorage();
}

// Verschiebe Notiz aus Papierkorb --> Notizen ("wiederherstellen")

function trashToNotes(indexTrashNote) {
  let restoredNote = trashNotes.splice(indexTrashNote, 1)[0];
  let restoredTitle = trashNotesTitles.splice(indexTrashNote, 1)[0];

  notes.push(restoredNote);
  notesTitles.push(restoredTitle);

  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();

  saveToLocalStorage();
}

// Verschiebe Notiz aus Papierkorb --> Archiv

function trashToArchive(indexTrashNote) {
  let movedNote = trashNotes.splice(indexTrashNote, 1);
  archiveNotes.push(movedNote[0]);

  let movedNoteTitle = trashNotesTitles.splice(indexTrashNote, 1);
  archiveNotesTitles.push(movedNoteTitle[0]);

  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
  saveToLocalStorage();
}

// Papierkorb --> endgültig löschen

function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  trashNotesTitles.splice(indexTrashNote, 1); // hinzugefügt, damit auch der Titel gelöscht wird
  renderNotes();
  renderTrashNotes();

  saveToLocalStorage(); // Wenn eine Notiz endgültig gelöscht wird, wird das neue Array im LocalStorage gespeichert
}

// Aufgabe 10: Implementiere nun in deinem Notizblock, dass alles im LocalStorage
// gespeichert wird und beim Neuladen der Seite auch angezeigt wird.

// WAS? Im LocalStorage müssen folgende Arrays gespeichert werden:
// notes, notesTitles, trashNotes, trashNotesTitles

// WANN? Immer, wenn sich etwas ändert (hinzufügen, verschieben, löschen etc.)

// ACHTUNG: LocalStorage kann keine Arrays speichern, nur Strings
// --> Beim Speichern: JSON.stringify (in String umwandeln)
// --> Beim Laden: JSON.parse (von String wieder in Array umwandeln)

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  localStorage.setItem(
    "archiveNotesTitles",
    JSON.stringify(archiveNotesTitles)
  );
}


function getFromLocalStorage() {   // Funktion holt gespeicherte Arrays aus dem LocalStorage
  if (JSON.parse(localStorage.getItem("notes")) != null) {
    notes = JSON.parse(localStorage.getItem("notes"));
    notesTitles = JSON.parse(localStorage.getItem("notesTitles"));
  }

  if (JSON.parse(localStorage.getItem("trashNotes")) != null) {
    trashNotes = JSON.parse(localStorage.getItem("trashNotes"));
    trashNotesTitles = JSON.parse(localStorage.getItem("trashNotesTitles"));
  }

  if (JSON.parse(localStorage.getItem("archiveNotes"))) {
    archiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));
    archiveNotesTitles = JSON.parse(localStorage.getItem("archiveNotesTitles"));
  }
}

