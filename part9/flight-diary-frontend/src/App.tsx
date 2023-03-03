import { useEffect, useState } from 'react';
import { getAll } from './services/diaries';
import { DiaryEntry } from './types';
import Entry from './components/Entry';
import Form from './components/Form';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const entries = await getAll();
      setDiaryEntries(entries);
    })();
  }, []);

  return (
    <div>
      <Form setEntries={setDiaryEntries} />
      <h1>Diary Entries</h1>
      {diaryEntries.length > 0 &&
        diaryEntries.map(entry => <Entry key={entry.id} entry={entry} />)}
    </div>
  );
}

export default App;
