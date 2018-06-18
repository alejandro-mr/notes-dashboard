import gql from 'graphql-tag';

export const GET_NOTES = gql`
  {
    notes {
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

export const GET_NOTE = gql`
  query note($id: ID!){
    note(id: $id) {
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

export const GET_NOTES_TOTAL = gql`
  {
    notesTotal @client
  }
`;

export const GET_EDITING_STATUS = gql`
  {
    noteEditing @client
  }
`;
