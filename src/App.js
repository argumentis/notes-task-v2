import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FolderList from "./components/FoldersList/index";
import NoteList from "./components/NotesList/index";
import NoteText from "./components/Note/index";
import Header from "./components/Header/index";
import { DragDropContext } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editNote, setNoteId } from "./Redux/ReducersFolder/notesReducer";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  header: { display: "flex" },
  main: { display: "flex", height: "95vh" },
  folderList: {
    flex: "0 25%",
    [theme.breakpoints.down("sm")]: {
      flex: "0 100%",
    },
  },
  notesList: { flex: "0 25%" },
  note: { flex: "1 50%" },
}));

const mapStateToProps = (store) => {
  const { notesList, noteId } = store.notes;
  const { folderId } = store.folder;
  return {
    notesList,
    noteId,
    folderId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editNoteAction: (type, value) => dispatch(editNote(type, value)),
    setNoteIdAction: (noteId) => dispatch(setNoteId(noteId)),
  };
};

function App(props) {
  const [folderListVisibility, setFolderListVisibility] = useState(true);
  const { editNoteAction, setNoteIdAction } = props;
  const classes = useStyles();

  // func for change folder id from note when DRAG ended
  const handleOnDragEnd = (result) => {
    const { combine, draggableId } = result;
    if (combine) {
      setNoteIdAction(draggableId);
      editNoteAction("changeNoteId", combine.draggableId);
      setNoteIdAction(undefined);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={classes.root}>
        <Hidden smDown>
          <div className={classes.header}>
            <Header folderListVisibility={folderListVisibility} setFolderListVisibility={setFolderListVisibility}/>
          </div>
        </Hidden>
        <div className={classes.main}>
          <div className={classes.folderList} style={{ display: folderListVisibility ? "block" : "none" }}>
            <FolderList />
          </div>
          <Hidden smDown>
            <div className={classes.notesList}><NoteList /></div>
            <div className={classes.note}><NoteText /></div>
          </Hidden>
        </div>
      </div>
    </DragDropContext>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  editNoteAction: PropTypes.func.isRequired,
  setNoteIdAction: PropTypes.func.isRequired,
};
