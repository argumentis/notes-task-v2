import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "& > *": {
      height: "10px",
      width: "10px",
      borderRadius: "10px",
      margin: "7px 0px 0px 5px",
    },
  },
  redButton: { backgroundColor: "#fd5a52", },
  yellowButton: { backgroundColor: "#fdbb3f", },
  greenButton: { backgroundColor: "#31c747", },
}));

export default function ClosingMenu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.redButton}></div>
      <div className={classes.yellowButton}></div>
      <div className={classes.greenButton}></div>
    </div>
  );
}
