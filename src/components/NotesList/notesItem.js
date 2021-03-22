import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ContextMenu from "../ContextMenu/index";
import NotesModal from "../Modal/index";
import { connect } from "react-redux";
import { addNote, setNoteId, deleteNote, editNote } from "../../Redux/ReducersFolder/notesReducer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Hidden from "@material-ui/core/Hidden";

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

const mapDispatchToProps = (dispatch) => {
  return {
    addNoteAction: (folderId) => dispatch(addNote(folderId)),
    deleteNoteAction: () => dispatch(deleteNote()),
    editNoteAction: (type, value) => dispatch(editNote(type, value)),
    setNoteIdAction: (noteId) => dispatch(setNoteId(noteId)),
  };
};

function NotesItem(props) {
  const classes = useStyles();
  const {
    noteId,
    folderId,
    setNoteIdAction,
    editNoteAction,
    addNoteAction,
    deleteNoteAction,
    itemId,
    itemName,
    itemStatus,
    itemDate,
  } = props;
  const [open, setOpen] = useState(false);
  const [menuStatus, setMenuStatus] = useState(null);
  const theme = useTheme();
  const widthLimit = useMediaQuery(theme.breakpoints.up("md"));

  const handleOpenModal = () => {
    if (open) return setOpen(false);
    return setOpen(true);
  };

  // func for set selected folder
  const handleListItemClick = (event, index) => {
    if (noteId !== itemId) {
      setNoteIdAction(index);
    }
  };

  // func for set status context menu
  const openContextMenu = (event) => {
    setMenuStatus(event.currentTarget);
  };

  // func for change value name note onChange
  const handleOnChange = (event) => {
    editNoteAction("renameNote", event.target.value);
  };

  // deactive input status on Blur
  const handleOnBlur = () => {
    editNoteAction("changeStatus", true);
  };

  return (
    <div className={classes.root}>
      <ListItem
        button
        onDoubleClick={widthLimit ? openContextMenu : handleOpenModal}
        selected={noteId === itemId}
        onClick={(event) => handleListItemClick(event, itemId)}
      >
        <div className={classes.notesFieldsPosition}>
          <ListItemText
            primary={
              <TextField
                id={itemId}
                className={classes.rootInput}
                value={itemName}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                InputProps={{
                  disableUnderline: itemStatus,
                  disabled: itemStatus,
                  autoFocus: true,
                }}
              />
            }
          />
          <div>{itemDate}</div>
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
        addItem={addNoteAction}
        deleteItem={deleteNoteAction}
        clearId={setNoteIdAction}
        changeInputStatus={editNoteAction}
        folderId={folderId}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesItem);

NotesItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemDate: PropTypes.string.isRequired,
  itemStatus: PropTypes.bool.isRequired,
  addNotesAction: PropTypes.func,
  notesList: PropTypes.array.isRequired,
  setNoteIdAction: PropTypes.func.isRequired,
  noteId: PropTypes.string,
};
