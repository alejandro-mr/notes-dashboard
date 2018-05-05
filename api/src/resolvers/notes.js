import { Note } from '../models';
import { pubsub } from '../connectors';

export const NOTE_ADDED = 'noteAdded';

const resolvers = {
  Query: {
    notes: () => Note.find(),
    note: (_, { id }) => Note.findById(id)
  },
  Mutation: {
    createNote: (_, { note }) => {
      pubsub.publish(NOTE_ADDED, {'note': note});
      return Note.create(note);
    }
  },
  Subscription: {
    note: {
      subscribe: () => pubsub.asyncIterator(NOTE_ADDED)
    }
  }
};

export default resolvers;
