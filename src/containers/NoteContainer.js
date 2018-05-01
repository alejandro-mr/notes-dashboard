// @flow

import {
  connect
} from 'react-redux';
import {
  setNoteSize,
  setNotePosition,
  setTop
} from '../actions';

import {
  addNote,
  deleteNote,
  updateNote
} from '../actions/actionCreators';

import NoteList from '../components/NoteList';

const mapStateToProps = state => {
  return {
    notes: state.notes,
    top: state.top
  }
}

type Position = {
  x: number,
  y: number,
  x: number
}

type Note = {
  id: string,
  title: string,
  content: string,
  position: Position
}

const mapDispatchToProps = dispatch => {
  return {
    resizeNote: (id: number, width: number, height: number) => {
      dispatch(setNoteSize(id, width, height))
    },
    updateNotePosition: (id: number, position: Position) => {
      dispatch(setNotePosition(id, position))
      dispatch(setTop(position.z))
    },
    updateTop: (top) => {
      dispatch(setTop(top));
    },
    addNote: (id: number, title: string, content: string, position: Position) => {
      dispatch(addNote({
        id: id,
        title: title,
        content: content,
        ...position
      }));
    },
    deleteNote: (id: number) => {
      dispatch(deleteNote(id));
    },
    updateNote: (id: number, note: Note) => {
      dispatch(updateNote(note));
    }
  }
}

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList) 
export default NotesContainer
