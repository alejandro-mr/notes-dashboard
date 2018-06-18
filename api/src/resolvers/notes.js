import { Note } from '../models';
import { pubsub } from '../pubsub';

import { withFilter } from 'graphql-subscriptions';

export const NOTE_ADDED = 'noteAdded';
export const NOTE_DELETED = 'noteDeleted';

const resolvers = {
  Query: {
    notes: () => Note.find(),
    note: (_, { id }) => Note.findById(id)
  },
  Mutation: {
    createNote: (_, { note }) => {
      return Note.create(note)
        .then((noteCreated) => {
          pubsub.publish(NOTE_ADDED, { noteAdded: noteCreated });
          return noteCreated;
        });
    },
    deleteNote: (_, { id }) => {
      return Note.findByIdAndDelete(id)
        .then((noteDeleted) => {
          pubsub.publish(NOTE_DELETED, { noteDeleted: noteDeleted });
          return noteDeleted;
        });
    }
  },
  Subscription: {
    noteAdded: {
      subscribe: () => pubsub.asyncIterator(NOTE_ADDED)
    },
    noteDeleted: {
      subscribe: () => pubsub.asyncIterator(NOTE_DELETED)
    }
  }
};

export default resolvers;
