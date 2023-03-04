import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (patientID: string): Promise<Patient> => {
  try {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${patientID}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data.error);
    else throw new Error('Soemthing went wrong');
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getPatient,
};
