interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  targetDailyHours: number;
  dailyExerciseHours: number[];
}

function getRating(targetDailyHours: number, average: number): 1 | 2 | 3 {
  if (Math.round(average) === targetDailyHours) {
    return 2;
  } else if (Math.round(average) > targetDailyHours) {
    return 3;
  } else {
    return 1;
  }
}

function getRatingDescription(rating: 1 | 2 | 3): string {
  switch (rating) {
    case 1:
      return 'that was bad and you should feel bad';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'great job!';
  }
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  const input: number[] = args.slice(2).map(n => +n);

  if (input.length < 2) {
    throw new Error('Missing input');
  }

  if (input.every(n => !isNaN(n))) {
    return {
      targetDailyHours: input[0],
      dailyExerciseHours: input.slice(1),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

function calculateExercises(
  dailyExerciseHours: number[],
  targetDailyHours: number
): Result {
  const trainingDays = dailyExerciseHours.reduce(
    (acc, cur) => (cur > 0 ? acc + 1 : acc),
    0
  );
  const average =
    dailyExerciseHours.reduce((acc, cur) => acc + cur) /
    dailyExerciseHours.length;

  const success = targetDailyHours >= average;
  const rating = getRating(targetDailyHours, average);
  const ratingDescription = getRatingDescription(rating);
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    target: targetDailyHours,
    average,
    success,
    rating,
    ratingDescription,
  };
}

try {
  const { dailyExerciseHours, targetDailyHours } = parseExerciseArguments(
    process.argv
  );
  const result = calculateExercises(dailyExerciseHours, targetDailyHours);
  console.log(result);
} catch (error: unknown) {
  if (error instanceof Error)
    console.log('Something went wrong: ' + error.message);
}
