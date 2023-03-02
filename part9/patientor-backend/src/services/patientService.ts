import patients from '../data/patients';
import { NonSensitivePatientData, Patient, NewPatient } from '../types/types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  return newPatient;
};

export default {
  getAllPatients,
  addPatient,
};
