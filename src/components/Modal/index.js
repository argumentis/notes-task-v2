import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import NoteText from "../Note/index";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#f7f6f7",
  },
  button: {
    width: "100%",
    color: "#bababa",
    height: "30px",
    textTransform: "none",
  },
}));

export default function NotesModal(props) {
  const classes = useStyles();
  const { setOpen, open } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={setOpen}>
        <div className={classes.root}>
          <Button className={classes.button} onClick={handleClose}>
            Save and Close
          </Button>
          <NoteText />
        </div>
      </Modal>
    </div>
  );
}

NotesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
