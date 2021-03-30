export const ADD_FOLDER = "ADD_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const SET_FOLDER_ID = "SET_FOLDER_ID";
export const EDIT_FOLDER = "EDIT_FOLDER";

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

export function editFolder(name, value) {
  return {
    type: "EDIT_FOLDER",
    payload: value,
    fieldName: name,
  };
}

export function setFolderId(folderId) {
  return {
    type: "SET_FOLDER_ID",
    payload: folderId,
  };
}
