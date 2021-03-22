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
import { addNote } from "../../Redux/ReducersFolder/notesReducer";
import { addFolder, deleteFolder, setFolderId, editFolder, } from "../../Redux/ReducersFolder/folderReducer.js";
import { setNoteId } from "../../Redux/ReducersFolder/notesReducer";

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

const mapDispatchToProps = (dispatch) => {
  return {
    addFolderAction: () => dispatch(addFolder()),
    deleteFolderAction: () => dispatch(deleteFolder()),
    editFolderAction: (type, value) => dispatch(editFolder(type, value)),
    setFolderIdAction: (folderId) => dispatch(setFolderId(folderId)),
    setNoteIdAction: (noteId) => dispatch(setNoteId(noteId)),
    addNoteAction: (folderId) => dispatch(addNote(folderId)),
  };
};

function FolderItem(props) {
  const classes = useStyles();
  const {
    folderId,
    noteId,
    itemId,
    itemName,
    itemStatus,
    setFolderIdAction,
    setNoteIdAction,
    addFolderAction,
    addNoteAction,
    deleteFolderAction,
    editFolderAction,
  } = props;
  const [menuStatus, setMenuStatus] = useState(null);
  const theme = useTheme();
  const widthLimit = useMediaQuery(theme.breakpoints.up("md"));

  // func for set selected folder
  const handleListItemClick = (event, index) => {
    if (folderId !== itemId) {
      setFolderIdAction(index);
    }
    if (noteId !== undefined) {
      setNoteIdAction(undefined);
    }
  };

  // func for set menu status
  const openContextMenu = (event) => {
    setMenuStatus(event.currentTarget);
  };
  // change item name
  const handleOnChange = (event) => {
    editFolderAction("renameFolder", event.target.value);
  };
  // deactive input status on Blur
  const handleOnBlur = () => {
    editFolderAction("changeStatus", true);
  };

  return (
    <div>
      <div className={classes.root}>
        <ListItem
          button
          onDoubleClick={widthLimit ? openContextMenu : null}
          selected={folderId === itemId}
          onClick={(event) => handleListItemClick(event, itemId)}
        >
          <ListItemText
            primary={
              <TextField
                id={itemId}
                className={classes.inputStyle}
                defaultValue={itemName}
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
        addItem={widthLimit ? addFolderAction : addNoteAction}
        deleteItem={deleteFolderAction}
        clearId={setFolderIdAction}
        changeInputStatus={editFolderAction}
      />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(FolderItem);

FolderItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemStatus: PropTypes.bool.isRequired,
  setFolderIdAction: PropTypes.func.isRequired,
  setNoteIdAction: PropTypes.func.isRequired,
  editFolderAction: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  noteId: PropTypes.string,
};
