// Notizen-Template
function getNoteTemplate(indexNote) { // get = kriegen wir // Übergabeparameter benötigt (indexNote) 
  return `<p>Titel: ${notesTitles[indexNote]} <br> Notiz: ${notes[indexNote]}<br>
  <button class="btn" onclick="noteToArchive(${indexNote})">Archiv</button>
  <button class="btn" onclick="noteToTrash(${indexNote})">Papierkorb</button> 
  </p> <br>`;
}

// Archiv-Template
function getArchiveNoteTemplate(indexArchiveNote) {
  return `<p>Titel: ${archiveNotesTitles[indexArchiveNote]} <br> Notiz: ${archiveNotes[indexArchiveNote]}<br>
  <button class="btn" onclick="archiveToNotes(${indexArchiveNote})">Notizen</button>
  <button class="btn" onclick="archiveToTrash(${indexArchiveNote})">Papierkorb</button> 
  </p> <br>`;
} 

// Papierkorb-Template
function getTrashNoteTemplate(indexTrashNote) {
  return `<p>Titel: ${trashNotesTitles[indexTrashNote]} <br> Notiz: ${trashNotes[indexTrashNote]}<br>
  <button class="btn" onclick="trashToNotes(${indexTrashNote})">wiederherstellen</button>
  <button class="btn" onclick="trashToArchive(${indexTrashNote})">Archiv</button>
  <button class="btn" onclick="deleteNote(${indexTrashNote})">löschen</button> 
  </p> <br>`;
}