// @flow

type Position = {
  x: number,
  y: number,
  z: number
}

export const setNoteSize = (id: string, width: number, height: number) => {
  return {
    type: "SET_NOTE_SIZE",
    id,
    width,
    height
  }
}

export const setNotePosition = (id: string, position: Position) => {
  return {
    type: "SET_NOTE_POSITION",
    id,
    x: position.x,
    y: position.y,
    z: position.z
  }
}

export const setTop = (top: number) => {
  return {
    type: "UPDATE_TOP",
    top
  }
}
