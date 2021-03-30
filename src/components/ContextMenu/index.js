import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function ContextMenu(props) {
  const theme = useTheme();
  const widthLimit = useMediaQuery(theme.breakpoints.up("md"));
  const {
    name,
    folderId,
    addItem,
    deleteItem,
    clearId,
    ClearUnusedNotes,
    menuStatus,
    setMenuStatus,
    changeInputStatus,
  } = props;

  // func for close context menu
  const handleClose = () => {
    setMenuStatus(null);
  };

  // func for push new item to array
  const addItemButton = () => {
    addItem(folderId);
    handleClose();
  };

  // func make input active
  const makeInputActive = () => {
    handleClose();
    changeInputStatus("inputStatus", false);
  };

  // func for delete item from array
  const removeitemButton = () => {
    if (name === "folder") ClearUnusedNotes(folderId);
    deleteItem();
    clearId(undefined);
    handleClose();
  };

  return (
    <div style={{ cursor: "context-menu" }}>
      <Menu
        id="simple-menu"
        anchorEl={menuStatus}
        keepMounted
        open={Boolean(menuStatus)}
        onClose={handleClose}
      >
        {name === "note" && !widthLimit ? null : (
          <MenuItem onClick={addItemButton}>
            {`Add ${widthLimit ? name : "note"}`}
          </MenuItem>
        )}
        <MenuItem onClick={makeInputActive}>{`Rename ${name}`}</MenuItem>
        <MenuItem onClick={removeitemButton}>{`Delete ${name}`}</MenuItem>
      </Menu>
    </div>
  );
}

ContextMenu.propTypes = {
  folderId: PropTypes.string,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  changeInputStatus: PropTypes.func.isRequired,
  clearId: PropTypes.func.isRequired,
  setMenuStatus: PropTypes.func.isRequired,
  menuStatus: PropTypes.object,
};
