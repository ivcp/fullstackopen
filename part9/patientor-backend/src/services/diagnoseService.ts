import diagnoses from '../data/diagnoses';
import { Diagnose } from '../types/types';

const getAllDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getAllDiagnoses,
};
