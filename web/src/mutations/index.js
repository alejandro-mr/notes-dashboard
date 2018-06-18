import gql from 'graphql-tag';

export const ADD_NOTE = gql`
  mutation createNote($note: NoteInput!) {
    createNote(note: $note) {
      _id
      title
      content
      position {
        x
        y
        z
      }
      width
      height
      color
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
      _id
    }
  }
`;

export const TOGGLE_NOTE_EDITING = gql`
  mutation toggleNoteEditing($editing: Boolean!) {
    toggleNoteEditing(editing: $editing) @client
  }
`;
