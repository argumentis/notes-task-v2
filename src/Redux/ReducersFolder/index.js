import { combineReducers } from 'redux'
import { folderReducer } from './folderReducer'
import { notesReducer } from './notesReducer'

export const rootReducer = combineReducers({
  folder: folderReducer,
  notes: notesReducer
})
