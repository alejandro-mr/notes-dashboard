import db from '../connectors/note';

const create = (note) => {
  return db.create(note);
};

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
