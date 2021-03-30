import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ContextMenu from "../ContextMenu/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Hidden from "@material-ui/core/Hidden";
import {
  addFolder,
  deleteFolder,
  setFolderId,
  editFolder,
} from "../../redux/actions/folderActions";
import { setNoteId, addNote, ClearUnusedNotes } from "../../redux/actions/notesActions";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiListItem-root": {
      height: "40px",
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "#cccccc",
        height: "60px",
      },
    },
  },
  inputStyle: {
    display: "flex",
    "& .Mui-focused": {
      backgroundColor: "#f7f6f7",
    },
    "& .Mui-disabled": {
      color: "black",
    },
  },
}));

const mapStateToProps = (store) => {
  const { folderId } = store.folder;
  const { noteId } = store.notes;
  return {
    folderId,
    noteId,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      {
        addFolder,
        deleteFolder,
        editFolder,
        setFolderId,
        setNoteId,
        addNote,
        ClearUnusedNotes,
      },
      dispatch
    ),
  };
}

function FolderListItem(props) {
  const classes = useStyles();
  const {
    folderId,
    noteId,
    item,
    setFolderId,
    setNoteId,
    addFolder,
    addNote,
    ClearUnusedNotes,
    deleteFolder,
    editFolder,
  } = props;
  const { id, name, inputStatus } = item;
  const [menuStatus, setMenuStatus] = useState(null);
  const theme = useTheme();
  const widthLimit = useMediaQuery(theme.breakpoints.up("md"));

  // func for set selected folder
  const handleListItemClick = () => {
    if (folderId !== id) {
      setFolderId(id);
    }
    if (noteId !== undefined) {
      setNoteId(undefined);
    }
  };

  // func for set menu status
  const openContextMenu = (event) => {
    setMenuStatus(event.currentTarget);
  };
  // change item name
  const handleOnChange = (event) => {
    editFolder("name", event.target.value);
  };
  // deactive input status on Blur
  const handleOnBlur = () => {
    editFolder("inputStatus", true);
  };

  return (
    <div>
      <div className={classes.root}>
        <ListItem
          button
          onDoubleClick={widthLimit ? openContextMenu : null}
          selected={folderId === id}
          onClick={handleListItemClick}
        >
          <ListItemText
            primary={
              <TextField
                id={id}
                className={classes.inputStyle}
                defaultValue={name}
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
          <Hidden mdUp>
            <IconButton onClick={openContextMenu}>
              <MoreHorizIcon />
            </IconButton>
          </Hidden>
        </ListItem>
      </div>
      <ContextMenu
        name={"folder"}
        menuStatus={menuStatus}
        setMenuStatus={setMenuStatus}
        folderId={folderId}
        addItem={widthLimit ? addFolder : addNote}
        deleteItem={deleteFolder}
        clearId={setFolderId}
        ClearUnusedNotes={ClearUnusedNotes}
        changeInputStatus={editFolder}
      />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(FolderListItem);

FolderListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inputStatus: PropTypes.bool,
  setFolderId: PropTypes.func.isRequired,
  setNoteId: PropTypes.func.isRequired,
  editFolder: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  noteId: PropTypes.string,
};
