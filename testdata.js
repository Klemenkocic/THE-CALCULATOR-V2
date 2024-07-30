const mongoose = require('mongoose');
const Exercise = require('./models/exercise');
const Workout = require('./models/workout');

mongoose.connect('mongodb://localhost:27017/calculator_v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  await Exercise.deleteMany({});
  await Workout.deleteMany({});

  const exercises = [
    { name: 'Bench Press', weight: 70, reps: 10, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Squat', weight: 100, reps: 8, tempo: '3-1-2', rest: 90, userId: new mongoose.Types.ObjectId() },
    { name: 'Deadlift', weight: 120, reps: 6, tempo: '1-1-1', rest: 120, userId: new mongoose.Types.ObjectId() },
    { name: 'Overhead Press', weight: 50, reps: 10, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Bent-over Row', weight: 80, reps: 8, tempo: '2-1-2', rest: 90, userId: new mongoose.Types.ObjectId() },
    { name: 'Pull-up', weight: 0, reps: 12, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Bicep Curl', weight: 20, reps: 15, tempo: '2-1-2', rest: 45, userId: new mongoose.Types.ObjectId() },
    { name: 'Tricep Extension', weight: 25, reps: 12, tempo: '2-1-2', rest: 45, userId: new mongoose.Types.ObjectId() },
    { name: 'Leg Press', weight: 180, reps: 10, tempo: '2-1-2', rest: 90, userId: new mongoose.Types.ObjectId() },
    { name: 'Lunges', weight: 40, reps: 12, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Chest Fly', weight: 35, reps: 10, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Lat Pulldown', weight: 70, reps: 10, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Leg Curl', weight: 50, reps: 15, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Leg Extension', weight: 60, reps: 15, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Calf Raise', weight: 80, reps: 20, tempo: '2-1-2', rest: 45, userId: new mongoose.Types.ObjectId() },
    { name: 'Seated Row', weight: 60, reps: 10, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Dumbbell Press', weight: 50, reps: 12, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Dumbbell Fly', weight: 30, reps: 12, tempo: '2-1-2', rest: 60, userId: new mongoose.Types.ObjectId() },
    { name: 'Front Raise', weight: 20, reps: 15, tempo: '2-1-2', rest: 45, userId: new mongoose.Types.ObjectId() },
    { name: 'Lateral Raise', weight: 15, reps: 15, tempo: '2-1-2', rest: 45, userId: new mongoose.Types.ObjectId() }
  ];

  await Exercise.insertMany(exercises);

  const workouts = [
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[0], exercises[1]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[1], exercises[2]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[2], exercises[3]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[3], exercises[4]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[4], exercises[5]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[5], exercises[6]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[6], exercises[7]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[7], exercises[8]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[8], exercises[9]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[9], exercises[10]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[10], exercises[11]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[11], exercises[12]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[12], exercises[13]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[13], exercises[14]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[14], exercises[15]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[15], exercises[16]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[16], exercises[17]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[17], exercises[18]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[18], exercises[19]] },
    { userId: new mongoose.Types.ObjectId(), exercises: [exercises[0], exercises[19]] }
  ];

  await Workout.insertMany(workouts);

  console.log('Sample data added');
  mongoose.connection.close();
});
