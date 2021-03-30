import { uid } from "uid";
import {
  ADD_FOLDER,
  SET_FOLDER_ID,
  DELETE_FOLDER,
  EDIT_FOLDER,
} from "../actions/folderActions";

const initialState = {
  foldersList: JSON.parse(localStorage.getItem("arrFolders")) || [],
  folderId: undefined,
};

export function folderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER:
      const newFolder = {
        id: uid(),
        name: "New Folder",
        inputStatus: true,
      };
      localStorage.setItem(
        "arrFolders",
        JSON.stringify([...state.foldersList, newFolder])
      );
      return { ...state, foldersList: [...state.foldersList, newFolder] };

    case SET_FOLDER_ID:
      return { ...state, folderId: action.payload };

    case DELETE_FOLDER:
      const changedFolderList = state.foldersList.filter(
        (item) => item.id !== state.folderId
      );
      localStorage.setItem("arrFolders", JSON.stringify(changedFolderList));
      return { ...state, foldersList: changedFolderList };

    case EDIT_FOLDER:
      const changeFolderList = state.foldersList.map((item) => {
        if (item.id === state.folderId) {
          return { ...item, [action.fieldName]: action.payload };
        }
        return item;
      });
      localStorage.setItem("arrFolders", JSON.stringify(changeFolderList));
      return { ...state, foldersList: changeFolderList };

    default:
      return state;
  }
}
