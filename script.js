// Notizen anzeigen lassen

// ich brauche Notizen
let notes = ["banana", "rasen mähen"];
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
function getNoteTemplate(indexNote) {
  // get = kriegen wir // Übergabeparameter (note)
  return `<p>+ ${notes[indexNote]}<button onclick="deleteNote(${indexNote})">X</button></p>`;
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

// Papierkorb anlegen
function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length; //// ??????TrashNotes.length?
    index++
  ) {
    trashContentRef.innerHTML += getNoteTemplate(indexTrashNote);
  }
}

//  // Das HTML wird aus der function renderTrashNotes() ausgegliedert
function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ ${notes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`;
}


// Notizen löschen & Anzeige updaten

function deleteNote(indexNote) {
  // console.log(notes.splice(indexNote,1));

  //   notes.splice(indexNote, 1); // array.splice(indexNummer_Pflicht, NumberOfItemsToBeRemoved_Optional, item1ToBeAdded, ..., intemNToBeAdded  ))

  let trashNote = notes.splice(indexNote, 1); // EINZELNE (!) trashNote undlgiech trashNotes!
  trashNotes.push(trashNote);
  renderNotes();
  renderTrashNotes(); // Rendern = anzeigen lassen
}



// Notizen archivieren
