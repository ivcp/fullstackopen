import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { ExerciseValues } from './exerciseCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).send({ error: 'malformed parameters' });
  }

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight));
    res.json({
      height,
      weight,
      result,
    });
  } else {
    res.status(400).send({ error: 'malformed parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  const exerciseHours = daily_exercises as ExerciseValues['dailyExerciseHours'];
  const targetHours = target as ExerciseValues['targetDailyHours'];

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  if (
    !isNaN(Number(target)) &&
    Array.isArray(daily_exercises) &&
    daily_exercises.every((n: string) => !isNaN(+n))
  ) {
    const result = calculateExercises(exerciseHours, targetHours);
    res.json(result);
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
