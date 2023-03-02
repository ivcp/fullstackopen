import { NewPatient, Gender } from './types/types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect format for name');
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map(g => g.toString())
    .includes(gender);
};
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect format or gender entry');
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'occupation' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;
