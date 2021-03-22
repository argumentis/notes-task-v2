import { uid } from "uid";
import moment from "moment";

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const SET_NOTE_ID = "SET_NOTE_ID";
const EDIT_NOTE = "EDIT_NOTE";

const initialState = {
  notesList: JSON.parse(localStorage.getItem("arrNotes")) || [],
  noteId: undefined,
};

export function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      const newNote = {
        id: uid(),
        folderId: action.payload,
        name: "New Note",
        inputStatus: true,
        date: moment().format("L"),
        dateNote: moment().format("LLLL"),
      };
      localStorage.setItem("arrNotes", JSON.stringify([...state.notesList, newNote]));
      return { ...state, notesList: [...state.notesList, newNote] };

    case SET_NOTE_ID:
      return { ...state, noteId: action.payload };

    case DELETE_NOTE:
      const changedNoteList = state.notesList.filter((item) => item.id !== state.noteId);
      localStorage.setItem("arrNotes", JSON.stringify(changedNoteList));
      return { ...state, notesList: changedNoteList, };

    case EDIT_NOTE:
      const changeNoteList = state.notesList.map((item) => {
        if (item.id === state.noteId) {
          return {
            id: item.id,
            folderId: action.typeOfChange === "changeNoteId" ? action.payload : item.folderId,
            name: action.typeOfChange === "renameNote" ? action.payload : item.name,
            inputStatus: action.typeOfChange === "changeStatus" ? action.payload : item.inputStatus,
            noteValue: action.typeOfChange === "changeNoteValue" ? action.payload : item.noteValue || "",
            date: item.date,
            dateNote: item.dateNote,
          };
        }
        return item;
      });
      localStorage.setItem("arrNotes", JSON.stringify(changeNoteList));
      return { ...state, notesList: changeNoteList };
    default:
      return state;
  }
}

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

export function editNote(status, value) {
  return {
    type: "EDIT_NOTE",
    payload: value,
    typeOfChange: status,
  };
}

export function setNoteId(noteId) {
  return {
    type: "SET_NOTE_ID",
    payload: noteId,
  };
}
