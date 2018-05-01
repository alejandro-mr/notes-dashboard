import * as actionTypes from '../actions/actionTypes';

const notes = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTE_SIZE:
      return state.map(note =>
        (note.id === action.id) ?
        { ...note,
          width: action.width,
          height: action.height
        } :
        note
      )
    case actionTypes.SET_NOTE_POSITION:
      return state.map(note =>
        (note.id === action.id) ?
        { ...note,
          position: {
            x: action.x,
            y: action.y,
            z: action.z
          }
        } :
        note
      )
    case actionTypes.ADD_NOTE:
      return [...state, {
        id: action.id,
        title: action.title,
        content: action.content,
        position: {
          x: action.x,
          y: action.y,
          z: action.z
        }
      }];
    case actionTypes.UPDATE_NOTE:
      return state.map(note =>
        (note.id === action.id) ?
        { ...note,
          ...action
        } :
        note
      );
    case actionTypes.DELETE_NOTE:
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1)
      ];
    default:
      return state;
  }
}

export default notes;
