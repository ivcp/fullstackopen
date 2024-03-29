import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries/queries';
import GenrePicker from './GenrePicker';

const Books = props => {
  const [genreFilter, setGenreFilter] = useState(null);
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter ? genreFilter : '' },
  });

  if (!props.show) {
    return null;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenrePicker setGenreFilter={setGenreFilter} />
    </div>
  );
};

export default Books;
