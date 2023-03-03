import axios from 'axios';
import { baseUrl } from '../constants';
import { DiaryEntry, DiaryEntryForm } from '../types';

export const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`);
  return data;
};
export const addEntry = async (
  newEntry: DiaryEntryForm
): Promise<DiaryEntry | undefined> => {
  try {
    const { data } = await axios.post<DiaryEntry>(
      `${baseUrl}/diaries`,
      newEntry
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};
