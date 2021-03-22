import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNote, setNoteId, deleteNote } from "../../Redux/ReducersFolder/notesReducer";
import { deleteFolder, setFolderId } from "../../Redux/ReducersFolder/folderReducer";
import IconButton from "@material-ui/core/IconButton";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginLeft: "30%",
    "& > *": {
      marginLeft: "15px",
      marginTop: "5px",
      padding: "0px",
      width: "40px",
      height: "20px",
      borderRadius: "3px",
      backgroundColor: "#f5f5f5",
      boxShadow: "0 5px 4px -4px rgba(0, 0, 0, .2) ",
    },
  },
}));

const mapStateToProps = (store) => {
  const { noteId } = store.notes;
  const { folderId } = store.folder;

  return {
    noteId,
    folderId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNoteAction: (folderId) => dispatch(addNote(folderId)),
    setNoteIdAction: (noteId) => dispatch(setNoteId(noteId)),
    deleteFolderAction: () => dispatch(deleteFolder()),
    deleteNoteAction: () => dispatch(deleteNote()),
    setFolderIdAction: (folderId) => dispatch(setFolderId(folderId)),
  };
};

function ButtonsBlock(props) {
  const classes = useStyles();
  const {
    folderListVisibility,
    setFolderListVisibility,
    deleteFolderAction,
    deleteNoteAction,
    folderId,
    addNoteAction,
    setNoteIdAction,
    noteId,
    setFolderIdAction,
  } = props;

  // func for close/open folder list
  const changeVisibilityFolderList = () => {
    if (folderListVisibility) {
      return setFolderListVisibility(false);
    }
    return setFolderListVisibility(true);
  };

  // func for add new notes from folder
  const addNoteButton = () => {
    if (folderId) {
      addNoteAction(folderId);
    }
  };

  // func for remove active element folder/note
  const removeActiveElement = () => {
    if (!noteId) {
      deleteFolderAction();
      setFolderIdAction(undefined);
    } else {
      deleteNoteAction();
      setNoteIdAction(undefined);
    }
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={changeVisibilityFolderList}>
        <ViewCompactOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={removeActiveElement}>
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={addNoteButton}>
        <NoteAddOutlinedIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsBlock);

ButtonsBlock.propTypes = {
  noteId: PropTypes.string,
  folderId: PropTypes.string,
  addNoteAction: PropTypes.func.isRequired,
  deleteFolderAction: PropTypes.func.isRequired,
  deleteNoteAction: PropTypes.func.isRequired,
  setNoteIdAction: PropTypes.func.isRequired,
  setFolderIdAction: PropTypes.func.isRequired,
  folderListVisibility: PropTypes.bool.isRequired,
  setFolderListVisibility: PropTypes.func.isRequired,
};
