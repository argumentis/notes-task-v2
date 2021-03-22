import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoteTime from "./noteTime";
import NoteTextArea from "./noteTextArea";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      display: "flex",
      height: "95vh",
      flexDirection: "column",
      backgroundColor: "#f7f6f7",
    },
  },
}));

const mapStateToProps = (store) => {
  const { noteId, notesList } = store.notes;

  return {
    noteId,
    notesList,
  };
};

function NoteText(props) {
  const classes = useStyles();
  const { noteId, notesList } = props;
  const currentNoteValue = notesList.filter((item) => item.id === noteId);

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square>
        {currentNoteValue.map((item) => (
          <div key={item.id}>
            <NoteTime itemTime={item.dateNote} />
            <NoteTextArea defaultValue={item.noteValue} />
          </div>
        ))}
      </Paper>
    </div>
  );
}

export default connect(mapStateToProps)(NoteText);

NoteText.propTypes = {
  noteId: PropTypes.string,
  notesList: PropTypes.array.isRequired,
};
