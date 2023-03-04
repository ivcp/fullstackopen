import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Box from '@mui/material/Box';

const PatientDetails = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
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

      <Box>
        <Typography variant="h6" fontWeight="600">
          entries
        </Typography>

        {patient.entries.length > 0 ? (
          patient.entries.map(entry => {
            return (
              <Box key={entry.id}>
                {entry.date} {entry.description}
                <ul>
                  {entry.diagnosisCodes?.map(code => {
                    const diagnosisText = diagnoses.find(d => d.code === code);
                    return (
                      <li key={code}>
                        {code} {diagnosisText && diagnosisText.name}
                      </li>
                    );
                  })}
                </ul>
              </Box>
            );
          })
        ) : (
          <p>no entries for patient {patient.name}</p>
        )}
      </Box>
    </div>
  );
};

export default PatientDetails;
