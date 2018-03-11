const notes = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTE_SIZE':
      return state.map(note =>
        (note.id === action.id) ?
        { ...note,
          width: action.width,
          height: action.height
        } :
        note
      )
    case 'SET_NOTE_POSITION':
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
    default:
      return state;
  }
}

export default notes
