import patients from '../data/patients-full';
import { NonSensitivePatientData, Patient, NewPatient } from '../types/types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): NonSensitivePatientData[] => {
  return patients.map(
    ({ id, ssn, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (patientId: string): Patient | undefined => {
  return patients.find(patient => patient.id === patientId);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  addPatient,
  getPatient,
};
