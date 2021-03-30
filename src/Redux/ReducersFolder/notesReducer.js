import { uid } from "uid";
import moment from "moment";
import {
  ADD_NOTE,
  SET_NOTE_ID,
  DELETE_NOTE,
  EDIT_NOTE,
  CLEAR_UNUSED_NOTES,
  MOVE_NOTES,
} from "../actions/notesActions";

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
      return { ...state, notesList: changedNoteList };

    case MOVE_NOTES:
      const editedNotesList = state.notesList
        .filter((item) => item.folderId !== action.id)
        .concat(action.payload);
      localStorage.setItem("arrNotes", JSON.stringify(editedNotesList));
      return { ...state, notesList: editedNotesList };

    case CLEAR_UNUSED_NOTES:
      const clearedNoteList = state.notesList.filter(
        (item) => item.folderId !== action.payload
      );
      localStorage.setItem("arrNotes", JSON.stringify(clearedNoteList));
      return { ...state, notesList: clearedNoteList };

    case EDIT_NOTE:
      const changeNoteList = state.notesList.map((item) => {
        if (item.id === state.noteId) {
          return { ...item, [action.fieldName]: action.payload };
        }
        return item;
      });
      localStorage.setItem("arrNotes", JSON.stringify(changeNoteList));
      return { ...state, notesList: changeNoteList };
    default:
      return state;
  }
}
