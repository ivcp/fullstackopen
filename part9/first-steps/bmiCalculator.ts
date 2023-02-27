interface InputValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): InputValues => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

function calculateBmi(height: number, weight: number): void {
  const heightToMeters = height / 100;
  const bmi = weight / (heightToMeters * heightToMeters);

  if (bmi < 16) {
    console.log('Underweight (Severe thinness)');
  } else if (bmi > 16 && bmi < 17) {
    console.log('Underweight (Moderate thinness)');
  } else if (bmi > 17 && bmi < 18.5) {
    console.log('Underweight (Mild thinness)');
  } else if (bmi > 18.5 && bmi < 25) {
    console.log('Normal (healthy weight)');
  } else if (bmi > 25 && bmi < 30) {
    console.log('Overweight (Pre-obese)');
  } else if (bmi > 30 && bmi < 35) {
    console.log('Obese (Class I)');
  } else if (bmi > 35 && bmi < 40) {
    console.log('Obese (Class II)');
  } else if (bmi >= 40) {
    console.log('Obese (Class III)');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}
