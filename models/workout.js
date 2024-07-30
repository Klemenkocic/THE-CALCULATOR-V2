import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
});

const Workout = mongoose.model('Workout', workoutSchema);

export { Workout };
