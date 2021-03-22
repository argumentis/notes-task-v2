import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setNoteId, editNote } from "../../Redux/ReducersFolder/notesReducer";

const useStyles = makeStyles((theme) => ({
  textAreaStyle: {
    width: "99%",
    border: "0px",
    height: "85vh",
    resize: "none",
    outline: "none",
    backgroundColor: "#f7f6f7",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "80vh",
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

const mapDispatchToProps = (dispatch) => {
  return {
    setNoteIdAction: (noteId) => dispatch(setNoteId(noteId)),
    editNoteAction: (type, value) => dispatch(editNote(type, value)),
  };
};

function NoteTextArea(props) {
  const classes = useStyles();
  const { editNoteAction, defaultValue } = props;

  // func for change note value onChange
  const handleOnlChange = (event) => {
    editNoteAction("changeNoteValue", event.target.value);
  };

  return (
    <div>
      <textarea
        className={classes.textAreaStyle}
        defaultValue={defaultValue}
        onChange={handleOnlChange}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTextArea);

NoteTextArea.propTypes = {
  noteId: PropTypes.string,
  notesList: PropTypes.array.isRequired,
  editNoteAction: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};
