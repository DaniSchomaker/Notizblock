// Notizen-Template
function getNoteTemplate(indexNote) { // get = kriegen wir // Übergabeparameter benötigt (indexNote) 
  return `<p>+ Titel: ${notesTitles[indexNote]} - Notiz: ${notes[indexNote]}
  <button onclick="noteToArchive(${indexNote})">Archiv</button>
  <button onclick="noteToTrash(${indexNote})">Papierkorb</button>
  </p>`;
}

// Archiv-Template
function getArchiveNoteTemplate(indexArchiveNote) {
  return `<p>+ Titel: ${archiveNotesTitles[indexArchiveNote]} - Notiz: ${archiveNotes[indexArchiveNote]}
  <button onclick="archiveToNotes(${indexArchiveNote})">Notizen</button>
  <button onclick="archiveToTrash(${indexArchiveNote})">Papierkorb</button></p>`;
} 

// Papierkorb-Template
function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ Titel: ${trashNotesTitles[indexTrashNote]} - Notiz: ${trashNotes[indexTrashNote]}
  <button onclick="trashToNotes(${indexTrashNote})">wiederherstellen</button>
  <button onclick="trashToArchive(${indexTrashNote})">in das Archiv verschieben</button>
  <button onclick="deleteNote(${indexTrashNote})">endgültig löschen</button>
  </p>`;
}