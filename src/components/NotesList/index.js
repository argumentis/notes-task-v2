import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import NotesListItem from "./notesListItem";
import Paper from "@material-ui/core/Paper";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      display: "flex",
      height: "95vh",
      flexDirection: "column",
      backgroundColor: "#f7f6f7",
    },
  },
  noteItemIsDrag: {
    backgroundColor: "#fde46e",
  },
  noteItem: {
    backgroundColor: "transparent",
  },
  noteListWrapper: {
    overflow: "auto",
    backgroundColor: "none",
    "& > *": {
      padding: "0px",
      width: "100%",
    },
  },
}));

const mapStateToProps = (store) => {
  const { notesList } = store.notes;
  const { folderId } = store.folder;
  return {
    notesList,
    folderId,
  };
};

function NoteList(props) {
  const classes = useStyles();
  const { notesList, folderId } = props;

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square>
        <div className={classes.noteListWrapper}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <List component="nav" {...provided.droppableProps} ref={provided.innerRef}>
                {notesList
                  .filter((item) => item.folderId === folderId)
                  .map((item, index) => (
                    <Draggable index={index} draggableId={item.id} key={item.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={classNames(classes.noteItem, {
                            [classes.noteItemIsDrag]: snapshot.isDragging,
                          })}
                        >
                          <NotesListItem item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </div>
      </Paper>
    </div>
  );
}

export default connect(mapStateToProps)(NoteList);

NoteList.propTypes = {
  notesList: PropTypes.array.isRequired,
  folderId: PropTypes.string,
};
