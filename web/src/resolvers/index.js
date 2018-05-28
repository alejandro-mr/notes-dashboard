import gql from 'graphql-tag'; 

export const defaults = {
  notesTotal: 0,
  noteEditing: false
};

const GET_NOTES = gql`
  {
    notes {
      title
    }
  }
`;

const GET_NOTE_EDITING = gql`
  {
    noteEditing @client
  }
`;

export const resolvers = {
  Query: {
    notesTotal: (_, args, { cache, getCacheKey }) => {
      const data = cache.readQuery({ query: GET_NOTES });

      return data.notes.length;
    }
  },
  Mutation: {
    toggleNoteEditing: (_, { editing }, { cache, getCacheKey }) => {
      const { noteEditing } = cache.readQuery({ query: GET_NOTE_EDITING });

      cache.writeData({
        data: {
          noteEditing: !noteEditing
        }
      });
      return null;
    }
  }
};
