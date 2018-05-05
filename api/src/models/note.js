import { pubsub, Note as db } from '../connectors';
import { NOTE_ADDED } from '../resolvers/notes';

const create = (note) => db.create(note);

const find = () => {
  return db.find();
};

const findById = (id) => {
  return db.findById(id);
};


export const Note = {
  create,
  find,
  findById
};
