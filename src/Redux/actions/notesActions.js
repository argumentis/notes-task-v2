export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SET_NOTE_ID = "SET_NOTE_ID";
export const EDIT_NOTE = "EDIT_NOTE";
export const CLEAR_UNUSED_NOTES = "CLEAR_UNUSED_NOTES";
export const MOVE_NOTES = "MOVE_NOTES";

export function addNote(activeFolderId) {
  return {
    type: "ADD_NOTE",
    payload: activeFolderId,
  };
}

export function deleteNote() {
  return {
    type: "DELETE_NOTE",
  };
}

export function editNote(name, value) {
  return {
    type: "EDIT_NOTE",
    payload: value,
    fieldName: name,
  };
}

export function setNoteId(noteId) {
  return {
    type: "SET_NOTE_ID",
    payload: noteId,
  };
}

export function ClearUnusedNotes(folderId) {
  return {
    type: "CLEAR_UNUSED_NOTES",
    payload: folderId,
  };
}

export function moveNotes(selectedNotes, folderId) {
  return {
    type: "MOVE_NOTES",
    id: folderId,
    payload: selectedNotes,
  };
}
