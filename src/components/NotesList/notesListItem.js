import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ContextMenu from "../ContextMenu/index";
import NotesModal from "../Modal/index";
import { connect } from "react-redux";
import {
  addNote,
  setNoteId,
  deleteNote,
  editNote,
} from "../../redux/actions/notesActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Hidden from "@material-ui/core/Hidden";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .Mui-selected": {
      backgroundColor: "#fde46e",
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "transparent",
      },
    },
    "& .MuiListItemText-root": {
      width: "100%",
    },
    "& .MuiListItem-root": {
      paddingLeft: "20px",
      paddingRight: "20px",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  },
  rootInput: {
    display: "flex",
    "& .Mui-focused": {
      backgroundColor: "#f7f6f7",
    },
    "& .Mui-disabled": {
      color: "black",
    },
  },
  notesFieldsPosition: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
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
    ...bindActionCreators({ addNote, deleteNote, editNote, setNoteId }, dispatch),
  };
}

function NotesListItem(props) {
  const classes = useStyles();
  const { noteId, folderId, setNoteId, editNote, addNote, deleteNote, item } = props;
  const { id, name, inputStatus, date } = item;
  const [open, setOpen] = useState(false);
  const [menuStatus, setMenuStatus] = useState(null);
  const theme = useTheme();
  const widthLimit = useMediaQuery(theme.breakpoints.up("md"));

  const handleOpenModal = () => {
    if (open) return setOpen(false);
    return setOpen(true);
  };

  // func for set selected folder
  const handleListItemClick = () => {
    if (noteId !== id) {
      setNoteId(id);
    }
  };

  // func for set status context menu
  const openContextMenu = (event) => {
    setMenuStatus(event.currentTarget);
  };

  // func for change value name note onChange
  const handleOnChange = (event) => {
    editNote("name", event.target.value);
  };

  // deactive input status on Blur
  const handleOnBlur = () => {
    editNote("inputStatus", true);
  };

  return (
    <div className={classes.root}>
      <ListItem
        button
        onDoubleClick={widthLimit ? openContextMenu : handleOpenModal}
        selected={noteId === id}
        onClick={handleListItemClick}
      >
        <div className={classes.notesFieldsPosition}>
          <ListItemText
            primary={
              <TextField
                id={id}
                className={classes.rootInput}
                value={name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                InputProps={{
                  disableUnderline: inputStatus,
                  disabled: inputStatus,
                  autoFocus: true,
                }}
              />
            }
          />
          <div>{date}</div>
        </div>
        <Hidden mdUp>
          <IconButton onClick={openContextMenu}>
            <MoreHorizIcon />
          </IconButton>
        </Hidden>
      </ListItem>
      <NotesModal open={open} setOpen={setOpen} />
      <ContextMenu
        name={"note"}
        menuStatus={menuStatus}
        setMenuStatus={setMenuStatus}
        addItem={addNote}
        deleteItem={deleteNote}
        clearId={setNoteId}
        changeInputStatus={editNote}
        folderId={folderId}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesListItem);

NotesListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  inputStatus: PropTypes.bool,
  addNotes: PropTypes.func,
  notesList: PropTypes.array.isRequired,
  setNoteId: PropTypes.func.isRequired,
  noteId: PropTypes.string,
};
