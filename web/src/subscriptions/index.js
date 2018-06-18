import gql from 'graphql-tag';

export const NOTE_CREATED = gql`
  subscription noteAdded {
    noteAdded {
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

export const NOTE_DELETED = gql`
  subscription noteDeleted {
    noteDeleted {
      _id
    }
  }
`;
