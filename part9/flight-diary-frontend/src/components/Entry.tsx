import { DiaryEntry } from '../types';
const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
      <p>comment: {entry.comment}</p>
    </div>
  );
};

export default Entry;
