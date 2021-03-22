import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClosingMenu from "./closingMenu";
import ButtonsBlock from "./buttonsBlock";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "30px",
    backgroundColor: "#e1dee1",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    boxShadow: "0 0 5px white inset",
    display: "flex",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { folderListVisibility, setFolderListVisibility } = props;

  return (
    <div className={classes.root}>
      <ClosingMenu />
      <ButtonsBlock
        folderListVisibility={folderListVisibility}
        setFolderListVisibility={setFolderListVisibility}
      />
    </div>
  );
}

Header.propTypes = {
  folderListVisibility: PropTypes.bool.isRequired,
  setFolderListVisibility: PropTypes.func.isRequired,
};
