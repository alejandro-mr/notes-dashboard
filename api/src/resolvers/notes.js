import { Note } from '../models';

const resolvers = {
  Query: {
    notes: () => Note.find(),
    note: (_, { id }) => {
      return Note.findById(id);
    }
  },
  Mutation: {
    createNote: (_, { note }) => {
      return Note.create(note);
    }
  }
};

export default resolvers;
