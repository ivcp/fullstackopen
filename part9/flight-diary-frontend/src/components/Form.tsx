import { useState } from 'react';
import { addEntry } from '../services/diaries';
import { Visibility, Weather } from '../types';
import { DiaryEntry } from '../types';

const Form = ({
  setEntries,
}: {
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newEntry = await addEntry({
        date,
        visibility,
        weather,
        comment,
      });
      setEntries(prev => [...prev, newEntry as DiaryEntry]);
      setError(null);
      setDate('');
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment('');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };
  return (
    <>
      <h1>Add New Entry</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility:{' '}
          {Object.values(Visibility).map(v => {
            return (
              <div key={v} style={{ display: 'inline' }}>
                <label htmlFor={v}>{v}</label>
                <input
                  id={v}
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={visibility === v}
                  onChange={() => setVisibility(v)}
                />
              </div>
            );
          })}
        </div>
        <div>
          weather:{' '}
          {Object.values(Weather).map(w => {
            return (
              <div key={w} style={{ display: 'inline' }}>
                <label htmlFor={w}>{w}</label>
                <input
                  id={w}
                  type="radio"
                  name="weather"
                  value={w}
                  checked={weather === w}
                  onChange={() => setWeather(w)}
                />
              </div>
            );
          })}
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <input type="submit" value="add" />
      </form>
    </>
  );
};

export default Form;
