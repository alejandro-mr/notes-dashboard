import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  title: String,
  content: String,
  position: {
    x: Number,
    y: Number,
    z: Number,
  },
  width: Number,
  height: Number,
});

export default mongoose.model('Note', noteSchema);
