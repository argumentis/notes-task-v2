import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import FolderListItem from "./folderListItem";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddFolderButton from "./addFolderButton.js";
import Paper from "@material-ui/core/Paper";
import NotesListItem from "../NotesList/notesListItem";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      display: "flex",
      height: "95vh",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#f7f6f7",
      [theme.breakpoints.down("sm")]: {
        height: "100vh",
      },
    },
  },
  folderListWrapper: {
    overflow: "auto",
    backgroundColor: "none",
  },
}));

const mapStateToProps = (store) => {
  const { foldersList } = store.folder;
  const { notesList } = store.notes;
  return {
    foldersList,
    notesList,
  };
};

function FolderList(props) {
  const classes = useStyles();
  const { foldersList, notesList } = props;

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square>
        <div className={classes.folderListWrapper}>
          <Droppable droppableId="droppableFolder" isCombineEnabled>
            {(provided) => (
              <List component="nav" {...provided.droppableProps} ref={provided.innerRef}>
                {foldersList.map((folderItem, index) => (
                  <Draggable
                    index={index}
                    draggableId={folderItem.id}
                    key={folderItem.id}
                    isDragDisabled
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.dragHandleProps}>
                        <FolderListItem item={folderItem} />
                        <Hidden mdUp>
                          {notesList
                            .filter((noteItem) => noteItem.folderId === folderItem.id)
                            .map((NoteItem) => (
                              <NotesListItem key={NoteItem.id} item={NoteItem} />
                            ))}
                        </Hidden>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </div>
        <AddFolderButton />
      </Paper>
    </div>
  );
}

export default connect(mapStateToProps)(FolderList);

FolderList.propTypes = {
  foldersList: PropTypes.array.isRequired,
  notesList: PropTypes.array.isRequired,
};
