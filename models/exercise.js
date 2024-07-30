import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  reps: Number,
  tempo: String,
  rest: Number,
  userId: mongoose.Schema.Types.ObjectId
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export { Exercise };

