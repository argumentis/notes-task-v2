import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FolderList from "./components/FoldersList/index";
import NoteList from "./components/NotesList/index";
import NoteText from "./components/Note/index";
import Header from "./components/Header/index";
import { DragDropContext } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editNote, setNoteId, moveNotes } from "./redux/actions/notesActions";
import Hidden from "@material-ui/core/Hidden";
import { bindActionCreators } from "redux";

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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ editNote, setNoteId, moveNotes }, dispatch),
  };
}

function App(props) {
  const { editNote, setNoteId, notesList, folderId, moveNotes } = props;
  const [folderListVisibility, setfolderListVisibility] = useState(true);
  const classes = useStyles();

  // func for change folder id from note when DRAG ended
  const handleOnDragEnd = (result) => {
    const { combine } = result;
    const items = notesList.filter((item) => item.folderId === folderId);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (combine) {
      editNote("folderId", combine.draggableId);
      setNoteId(undefined);
    } else if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      moveNotes(items, folderId);
    }
  };

  const handleOnDragStart = (result) => {
    const { draggableId } = result;
    setNoteId(draggableId);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
      <div className={classes.root}>
        <Hidden smDown>
          <div className={classes.header}>
            <Header
              folderListVisibility={folderListVisibility}
              setFolderListVisibility={setfolderListVisibility}
            />
          </div>
        </Hidden>
        <div className={classes.main}>
          <div
            className={classes.folderList}
            style={{ display: folderListVisibility ? "block" : "none" }}
          >
            <FolderList />
          </div>
          <Hidden smDown>
            <div className={classes.notesList}>
              <NoteList />
            </div>
            <div className={classes.note}>
              <NoteText />
            </div>
          </Hidden>
        </div>
      </div>
    </DragDropContext>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  editNote: PropTypes.func.isRequired,
  setNoteId: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  notesList: PropTypes.array.isRequired,
};
