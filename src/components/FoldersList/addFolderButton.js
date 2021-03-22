import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { addFolder } from "../../Redux/ReducersFolder/folderReducer.js";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    textTransform: "none",
    fontWeight: "bold",
    width: "100%",
    display: "  flex",
    justifyContent: "flex-start",
    paddingLeft: "15px",
  },
}));

const mapStateToProps = (store) => {
  const { foldersList } = store.folder;
  return {
    foldersList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFolderAction: () => dispatch(addFolder()),
  };
};

function AddFolderButton(props) {
  const classes = useStyles();
  const { addFolderAction } = props;

  // func for add folder to array
  const handleButtonClick = () => {
    addFolderAction();
  };

  return (
    <div className={classes.buttonStyle}>
      <Button
        className={classes.root}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleButtonClick}
      >
        New Folder
      </Button>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFolderButton);

AddFolderButton.propTypes = {
  addFolderAction: PropTypes.func.isRequired,
};
