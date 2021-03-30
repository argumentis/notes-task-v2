import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addNote,
  setNoteId,
  deleteNote,
  ClearUnusedNotes,
} from "../../redux/actions/notesActions";
import { deleteFolder, setFolderId } from "../../redux/actions/folderActions";
import IconButton from "@material-ui/core/IconButton";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import { bindActionCreators } from "redux";

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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      { addNote, deleteFolder, deleteNote, setFolderId, setNoteId, ClearUnusedNotes },
      dispatch
    ),
  };
}

function ButtonsBlock(props) {
  const classes = useStyles();
  const {
    folderListVisibility,
    setFolderListVisibility,
    ClearUnusedNotes,
    deleteFolder,
    deleteNote,
    folderId,
    addNote,
    setNoteId,
    noteId,
    setFolderId,
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
      addNote(folderId);
    }
  };

  // func for remove active element folder/note
  const removeActiveElement = () => {
    if (!noteId) {
      console.log(folderId);
      ClearUnusedNotes(folderId);
      deleteFolder();
      setFolderId(undefined);
    } else {
      deleteNote();
      setNoteId(undefined);
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
  addNote: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  ClearUnusedNotes: PropTypes.func.isRequired,
  setNoteId: PropTypes.func.isRequired,
  setFolderId: PropTypes.func.isRequired,
  folderListVisibility: PropTypes.bool.isRequired,
  setFolderListVisibility: PropTypes.func.isRequired,
};
