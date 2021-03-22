import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import FolderItem from "./folderItem";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddFolderButton from "./addFolderButton.js";
import Paper from "@material-ui/core/Paper";
import NotesItem from "../NotesList/notesItem";
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
              <List
                component="nav"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {foldersList.map((folderItem, index) => (
                  <Draggable
                    index={index}
                    draggableId={folderItem.id}
                    key={folderItem.id}
                    isDragDisabled
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FolderItem
                          itemId={folderItem.id}
                          itemName={folderItem.name}
                          itemStatus={folderItem.inputStatus}
                        />
                        <Hidden mdUp>
                          {notesList.filter((NoteItem) => NoteItem.folderId === folderItem.id).map((NoteItem) => (
                            <NotesItem
                              key={NoteItem.id}
                              itemId={NoteItem.id}
                              itemName={NoteItem.name}
                              itemStatus={NoteItem.inputStatus}
                              itemDate={NoteItem.date}
                            />
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
};
