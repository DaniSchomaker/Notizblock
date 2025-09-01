// Notizen anzeigen lassen

// ich brauche Notizen
let notesTitles = ['Ba','Aufgabe'];
let notes = ['banana', 'rasen mähen'];

let trashNotesTitles = [];
let trashNotes = [];

// ich muss definieren, wo/wann sie angezeigt werden
//  // HTML: <div> mit id erstellen
//  // JS: "render"-function, die beschreibt, wie etwas auf dem Bildschirm dargestellt wird
//  // HTML: function ausführen lassen <body onload="functionname()">
//  // JS: Das "HTML" in eine extra function (Template) schreiben

function renderNotes() {
  let contentRef = document.getElementById("content"); // in contentRef wird das Ergebnis aus der function gespeichert?
  contentRef.innerHTML = ""; // zu Beginn leeren

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote); // s.u.
  }
}

//  // Das HTML wird aus der function renderNotes() ausgegliedert
function getNoteTemplate(indexNote) {   // get = kriegen wir // Übergabeparameter (note)
  return `<p>+ title: ${notesTitles[indexNote]} -> ${notes[indexNote]}<button onclick="noteToTrash(${indexNote})">X</button></p>`;
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

//  // Das HTML wird aus der function renderTrashNotes() ausgegliedert
function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ title: ${trashNotesTitles[indexTrashNote]} ---> ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`;
}






// Notizen hinzufügen

function addNote() {
  let noteInputRef = document.getElementById("note_input"); // Eingabe auslesen
  let noteInput = noteInputRef.value;
  // man kann das oben auch in einer Zeile machen, aber TIPP:
  // Referenzen zu den HTML-Elementen und dass, was ich damit mache trennen

  notes.push(noteInput); // Eingabe dem notes-Array hinzufügen

  renderNotes(); // Eingabe anzeigen lassen

  noteInputRef.value = ""; //am Ende das Eingabefeld leeren
}


// Notizen dem Papierkorb hinzufügen bzw. ganz löschen & Anzeige updaten

function noteToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1); // EINZELNE (!) trashNote ungleich trashNotes!
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]);
    renderNotes();
    renderTrashNotes();
}


function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  renderNotes();
  renderTrashNotes(); 
}



// Notizen archivieren
