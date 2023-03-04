import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Box from '@mui/material/Box';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const patient = await patientService.getPatient(id as string);
        setPatient(patient);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    })();
  }, [id]);

  if (!patient) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <div>
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{ display: 'inline-block' }}
        >
          {patient.name}
        </Typography>{' '}
        <Box sx={{ display: 'inline-block' }}>
          {patient.gender === 'other' ? (
            <QuestionMarkIcon />
          ) : patient.gender === 'male' ? (
            <MaleIcon />
          ) : (
            <FemaleIcon />
          )}
        </Box>
      </div>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetails;
