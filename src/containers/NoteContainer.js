// @flow

import {
  connect
} from 'react-redux';
import {
  setNoteSize,
  setNotePosition,
  setTop
} from '../actions';
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

const mapDispatchToProps = dispatch => {
  return {
    resizeNote: (id: string, width: number, height: number) => {
      dispatch(setNoteSize(id, width, height))
    },
    updateNotePosition: (id: string, position: Position) => {
      dispatch(setNotePosition(id, position))
      dispatch(setTop(position.z))
    },
    updateTop: (top) => {
      dispatch(setTop(top));
    }
  }
}

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList) 
export default NotesContainer
