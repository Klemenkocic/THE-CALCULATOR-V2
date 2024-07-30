import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();

mongoose.connect('mongodb://localhost:27017/calculator_v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

import { User } from './models/user.js';
import { Exercise } from './models/exercise.js';
import { Workout } from './models/workout.js';

// User routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Exercise routes
app.post('/addExercise', async (req, res) => {
  const { name, weight, reps, tempo, rest, userId } = req.body;
  if (!name || !weight || !reps || !tempo || !rest || !userId) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const exercise = new Exercise({ name, weight, reps, tempo, rest, userId });
  try {
    await exercise.save();
    res.status(201).send(exercise);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Workout routes
app.post('/addWorkout', async (req, res) => {
  const { userId, exercises } = req.body;
  if (!userId || !exercises) {
    return res.status(400).send({ error: 'User ID and exercises are required' });
  }
  const workout = new Workout({ userId, exercises });
  try {
    await workout.save();
    res.status(201).send(workout);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Data normalization
const normalizeData = (data) => {
  const maxValues = {
    weight: 100,
    reps: 30,
    tempo: 60,
    rest: 600
  };

  return data.map(entry => ({
    weight: entry.weight / maxValues.weight,
    reps: entry.reps / maxValues.reps,
    tempo: entry.tempo / maxValues.tempo,
    rest: entry.rest / maxValues.rest
  }));
};

// Pearson correlation calculation
const calculatePearsonCorrelation = (data1, data2) => {
  const n = data1.length;
  if (n !== data2.length) {
    throw new Error('Data sets must have the same length');
  }

  const sum1 = data1.reduce((acc, val) => acc + val.weight, 0);
  const sum2 = data2.reduce((acc, val) => acc + val.weight, 0);

  const sum1Sq = data1.reduce((acc, val) => acc + val.weight * val.weight, 0);
  const sum2Sq = data2.reduce((acc, val) => acc + val.weight * val.weight, 0);

  const pSum = data1.reduce((acc, val, i) => acc + val.weight * data2[i].weight, 0);

  const num = pSum - (sum1 * sum2 / n);
  const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));

  if (den === 0) {
    return 0;
  }

  return num / den;
};

// Dynamic correlation calculation
const calculateDynamicCorrelation = (exercise1Data, exercise2Data) => {
  const normalizedExercise1Data = normalizeData(exercise1Data);
  const normalizedExercise2Data = normalizeData(exercise2Data);

  return calculatePearsonCorrelation(normalizedExercise1Data, normalizedExercise2Data);
};

// Correlation route
app.get('/getCorrelations', async (req, res) => {
  const { exercise1, exercise2 } = req.query;
  if (!exercise1 || !exercise2) {
    return res.status(400).send({ error: 'Exercise1 and Exercise2 are required' });
  }

  const exercise1Data = await Exercise.find({ name: exercise1 });
  const exercise2Data = await Exercise.find({ name: exercise2 });

  if (exercise1Data.length === 0 || exercise2Data.length === 0) {
    return res.status(404).send({ error: 'Exercises not found' });
  }

  const correlation = calculateDynamicCorrelation(exercise1Data, exercise2Data);
  res.send({ exercise1, exercise2, correlation });
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export { app, server };
