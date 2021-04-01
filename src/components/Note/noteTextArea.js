import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editNote } from "../../redux/actions/notesActions";
import { bindActionCreators } from "redux";

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
  const { noteId } = store.notes;

  return {
    noteId,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ editNote }, dispatch),
  };
}

function NoteTextArea(props) {
  const classes = useStyles();
  const { editNote, defaultValue } = props;

  // func for change note value onChange
  const handleOnlChange = (event) => {
    editNote("noteValue", event.target.value);
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
  editNote: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};
