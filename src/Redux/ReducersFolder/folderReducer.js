import { uid } from "uid";

const ADD_FOLDER = "ADD_FOLDER";
const DELETE_FOLDER = "DELETE_FOLDER";
const SET_FOLDER_ID = "SET_FOLDER_ID";
const EDIT_FOLDER = "EDIT_FOLDER";

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
      localStorage.setItem("arrFolders",JSON.stringify([...state.foldersList, newFolder])
      );
      return { ...state, foldersList: [...state.foldersList, newFolder] };

    case SET_FOLDER_ID:
      return { ...state, folderId: action.payload };

    case DELETE_FOLDER:
      const changedFolderList = state.foldersList.filter((item) => item.id !== state.folderId);
      localStorage.setItem("arrFolders", JSON.stringify(changedFolderList));
      return { ...state, foldersList: changedFolderList,};

    case EDIT_FOLDER:
      const changeFolderList = state.foldersList.map((item) => {
        if (item.id === state.folderId) {
          return {
            id: item.id,
            name: action.typeOfChange === "renameFolder" ? action.payload : item.name,
            inputStatus: action.typeOfChange === "changeStatus" ? action.payload : item.inputStatus,
          };
        }
        return item;
      });
      localStorage.setItem("arrFolders", JSON.stringify(changeFolderList));
      return { ...state, foldersList: changeFolderList };

    default:
      return state;
  }
}

export function addFolder() {
  return {
    type: "ADD_FOLDER",
  };
}

export function deleteFolder() {
  return {
    type: "DELETE_FOLDER",
  };
}

export function editFolder(status, value) {
  return {
    type: "EDIT_FOLDER",
    payload: value,
    typeOfChange: status,
  };
}

export function setFolderId(folderId) {
  return {
    type: "SET_FOLDER_ID",
    payload: folderId,
  };
}
